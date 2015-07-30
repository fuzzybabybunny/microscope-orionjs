Template.commentsIndexBlurbCell.helpers({

	blurb: function(){
		var blurb = jQuery.truncate(this.body, {
		  length: 15
		});
		return blurb
	}

});
