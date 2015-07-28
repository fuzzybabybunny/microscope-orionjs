Comments = new orion.collection('comments', {
  singularName: 'comment', // The name of one of these items
  pluralName: 'comments', // The name of more than one of these items
  link: {
    // *
    //  * The text that you want to show in the sidebar.
    //  * The default value is the name of the collection, so
    //  * in this case it is not necessary.
     
    title: 'Comments' 
  },
  /**
   * Tabular settings for this collection
   */
  tabular: {
    // here we set which data columns we want to appear on the data table
    // in the CMS panel
    columns: [
      { 
        data: "author", 
        title: "Author" 
      },{ 
        data: "postId", 
        title: "Post ID",
        render: function (val, type, doc) {
          arguments;
          if (val instanceof Date) {
            return moment(val).calendar();
          } else {
            return "Never";
          }
        }
      },
      orion.attributeColumn('createdAt', 'submitted', 'FREEDOM!!!'),
      {
        tmpl: Meteor.isClient && Template.bookCheckOutCell,
        title: "Checkout Button"
      },
      // orion.attributeColumn('bookCheckOutCell', 'submitted', 'test!!!'),
      // { 
      //   data: "submitted", 
      //   title: "Submitted" 
      // },
    ]
  },

  // post: orion.attribute('hasOne', {
  //   label: 'Post'
  // }, {
  //   collection: Posts,
  //   titleField: 'title',
  //   publicationName: 'youCanPutAnyStringYouWantHere',
  // })

});

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
  postId: orion.attribute('hasOne', {
    label: 'Post'
  }, {
    collection: Posts,
    titleField: 'title',
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

}));

var stuff = orion.attribute('summernote', {
    label: 'Body'
  });

var moreStuff = orion.attributeColumn('summernote', 'body', 'Preview')

