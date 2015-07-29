Meteor.methods({
  commentInsert: function(commentAttributes) {
    check(this.userId, String);
    check(commentAttributes, {
      postId: String,
      body: String
    });
    
    var user = Meteor.user();
    var post = Posts.findOne(commentAttributes.postId);

    if (!post)
      throw new Meteor.Error('invalid-comment', 'You must comment on a post');
    
    comment = _.extend(commentAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });
    
    // update the post with the number of comments
    Posts.update(comment.postId, {$inc: {commentsCount: 1}});
    
    // create the comment, save the id
    comment._id = Comments.insert(comment);
    
    // now create a notification, informing the user that there's been a comment
    createCommentNotification(comment);
    
    return comment._id;
  }
});

/**
 * Now we will attach the schema for that collection.
 * Orion will automatically create the corresponding form.
 */
Comments.attachSchema(new SimpleSchema({
  // here is where we define `a comment has one post`
  // Each document in Comment has a postId
  postId: orion.attribute('hasOne', {
    type: String,
    // the label is the text that will show up on the Update form's label
    label: 'Post',
    // optional is false because you shouldn't have a comment without a post
    // associated with it
    optional: false
  }, {
    // specify the collection you're making the relationship with
    collection: Posts,
    // the key whose value you want to show for each Post document on the Update form
    titleField: 'title',
    // dunno
    publicationName: 'someRandomString',
  }),
  userId: {
    type: String,
    optional: false,
    label: 'User ID',
  },
  author: {
    type: String,
    optional: false,
  },
  submitted: {
    type: Date,
    optional: false,
  },
  body: orion.attribute('summernote', {
    label: 'Body'
  }),
  image: orion.attribute('image', {
    optional: true,
    label: 'Comment Image'
  }),
}));

