// AutoForm.hooks({
// 	// 'orionBootstrapCollectionsUpdateForm' is the id that Orion gives all of its collection update forms
//   orionBootstrapCollectionsUpdateForm: {
// 	  after: {
// 	    update: function(error, result) {
// 				if (this.collection._name === 'comments'){
// 	    		var commentId = this.currentDoc._id;
// 	    		var comment = Comments.findOne(commentId);
// 		    	var userId = comment.userId;
// 		    	var username = Meteor.users.findOne(userId).profile.name;
// 		    	Comments.update({_id: commentId}, {$set: {author: username}});
// 		    	debugger
// 	    	};

// 	    }
// 	  },
//   }
// });