
    jQuery.fn.nonAjaxReply = function(options) {
        var commentForm = jQuery("form.comment-form");
	findParentComment = function(e) { return e.closest('.comment'); }
        var clicked = Array();
	alert('sdafasdf');
        var onReplyClick = function() {
		var replyLink = jQuery(this);
		var pid_e = findParentComment( jQuery(this) );
		var id = pid_e.attr('id');
		var idNumber = id.substring(id.indexOf('-')+1, id.length);
		jQuery("#comment-parent-id", commentForm).val(idNumber);
		alert(idNumber);
        };
        return this.each(function() {
            jQuery(this).click( onReplyClick );
        });
    };

