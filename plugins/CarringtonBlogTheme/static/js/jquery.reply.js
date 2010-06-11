
    jQuery.fn.nonAjaxReply = function(options) {
        var commentForm = jQuery("form.comment-form");
	findParentComment = function(e) { return e.closest('.comment'); }
        var clicked = Array();
	var replyField = jQuery("#reply-label", commentForm);
	var cancelReply = jQuery("#cancel-comment-reply", commentForm);
	var oldReplyText = replyField.text();
	var parentIdInput = jQuery("#comment-parent-id", commentForm);

	cancelReply.click(function() {
		replyField.text(oldReplyText);
		jQuery(this).hide();
		parentIdInput.val('');
		return false;
	});

        var onReplyClick = function() {
		var replyLink = jQuery(this);
		var pid_e = findParentComment( jQuery(this) );
		var id = pid_e.attr('id');
		var idNumber = id.substring(id.indexOf('-')+1, id.length);
		var author = jQuery("a.url", pid_e).text();
		parentIdInput.val(idNumber);
		replyField.html("Replying to " + author );
		cancelReply.show();
        };
        return this.each(function() {
            jQuery(this).click( onReplyClick );
        });
    };

