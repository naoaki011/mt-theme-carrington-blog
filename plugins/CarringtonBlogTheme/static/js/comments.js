cancelReplyLink = null;
parentID = null

jQuery(function() {
	jQuery("div.replyLoggedIn").greet({
		loggedInMessage: 'Logged in as %p. %o'
	})
	.find('a.logout').each(function() {
		jQuery(this)
			.html('<span>' + jQuery(this).text()  + '</span>')
			.addClass('btn')
			.addClass('btnLogout');
	});

	form = jQuery("#commentform");
	respond = jQuery("#respond");

	jQuery.fn.movabletype.fetchUser();
	user = jQuery.fn.movabletype.getUser();

	cancelReplyLink = jQuery("#cancel-comment-reply-link");
	parentID = jQuery("#comment-parent-id");

	cancelReplyLink.click(function() {
		parentID.val('');
		jQuery(this).hide();
		respond
			.appendTo( jQuery('#comments') )
			.removeClass('commentReplyActive');
	});

	jQuery("a.comment-reply-link").each(function () {
		jQuery(this).click(function() {
			cancelReplyLink.css('display', 'inline-block');
			parentIdAttr = jQuery(this).closest('li.comment').attr('id');
			parentID.val(parentIdAttr.substring('comment-'.length, parentIdAttr.length));

			respond
				.addClass('commentReplyActive')
				.insertAfter( jQuery(this).closest('li.comment') );

			return false;
		});
	});

	form.submit(function() {
		jQuery("#armor", this).val(mt.blog.comments.armor);
		return true;
	});
	form.onauthchange(function(evt, user) {
		if (user.is_authenticated)
		{
			jQuery("#replyName", form).val(user.name).parent().hide();
			jQuery("#replyEmail", form).val(user.email).parent().hide();
			jQuery("#replyURL", form).val(user.url).parent().hide();
		}
	});
});

showAll = false;
dots = jQuery('<span/>')
                .addClass('dots')
                .text('...')
		.css('font-weight', 'normal')
		.css('padding', '2px 6px');

function updateNavigation(blocksLength, currentLink, currentSpan) {
	plSelector = 'a.page-numbers';
	navBlock = jQuery('p.comment-pagination');

	navBlock.find('span.dots').each(function () { jQuery(this).remove(); });

	if (showAll)
		jQuery(plSelector, navBlock).each(function() {jQuery(this).show(); });
	showAll = true;
	currentSpan.text(currentLink.text()).insertAfter(currentLink.hide());
	nxt = currentSpan.next(plSelector);
	counter = 0;
	stepsRight = 2;//currentSpan.text() == 1 ?  : (currentSpan.text() == 2 ? 2 : 1);
	last = jQuery(plSelector, navBlock).last();

	first = jQuery(plSelector, navBlock).first();

	while (nxt.length > 0)
	{
		if (counter >= stepsRight && nxt.text() != last.text() )
			nxt.hide();
		nxt = nxt.next(plSelector);
		counter++;
	}
	if (counter >= 4 ) {
		dots.clone()
		.insertBefore(last);
	}

	prev = currentSpan.prev(plSelector);

	if (counter >= 2)
		skipToOnLeft = 2;
	else
		skipToOnLeft = 2;

	//if (!commentNav )
	//      skipToOnLeft--;

	counter = 0;
	while (prev.length > 0)
	{
		if (counter > skipToOnLeft && prev.text() != first.text())
			prev.hide();
		prev = prev.prev(plSelector);
		counter++;
	}

	if (counter >4) {
		dots.clone()
		.insertAfter(first);
	}
}





jQuery(function() {
	currentBlock = null;
	currentLink = null;
	currentSpan = jQuery('p.comment-pagination span.current');
	blocks = jQuery('ol.commentlist');
	if (blocks.length <= 1) {
		jQuery('p.comment-pagination').hide();
		return;
	}

	comNext = jQuery("#commentsNext");
	comPrev = jQuery("#commentsPrev");

	jQuery('p.comment-pagination a.page-numbers').each(function(i) {
		jQuery(this).click(function() {
			clicked = jQuery(this).text();
			currentBlock.hide();
			currentBlock = jQuery(blocks[clicked - 1]);
			currentBlock.show();					

			currentLink = jQuery(this);
			updateNavigation(blocks.length, currentLink, currentSpan );
		});
	});

	currentBlock = jQuery(blocks[0]);
	updateNavigation(blocks.length, jQuery('a.page-numbers:first'), currentSpan );
	currentLink = currentSpan.prev('a.page-numbers').hide();

	jQuery("#commentsNext").click(function() {
		next = currentSpan.next('a.page-numbers');

		if (next.length > 0)
		{
			next.click();
		}
	});
	jQuery("#commentsPrev").click(function() {
		prev = currentSpan.prev('a.page-numbers').prev('a.page-numbers');
		if (prev.length > 0)
		{
			prev.click();
		}
	});
});
