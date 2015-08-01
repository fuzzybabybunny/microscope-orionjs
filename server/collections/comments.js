
// When there is a change to userId, author gets updated
var query = Comments.find();
var handle = query.observeChanges({
  changed: function(commentId, changedField){
    
    if(changedField.userId){
      var username = Meteor.users.findOne(changedField.userId).profile.name;
      Comments.update({_id: commentId}, {$set: {author: username}});
    };

    if(changedField.postId){
      var po
    }

  }
});