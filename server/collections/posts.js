Meteor.methods({

	'postWithSameLink': function(url){
		var postWithSameLink = Posts.findOne({url: url});
    if (postWithSameLink) {
      throw new Meteor.Error('invalid', "A post with that url already exists.");
    }
	}

});