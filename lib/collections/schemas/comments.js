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
  // here is where we define `a comment has one user (author)`
  // Each document in Comment has a userId
  userId: orion.attribute('hasOne', {
    type: String,
    label: 'Author',
    optional: false
  }, {
    collection: Meteor.users,
    // the key whose value you want to show for each Post document on the Update form
    titleField: 'profile.name',
    publicationName: 'anotherRandomString',
  }),
  author: {
    type: String,
    optional: false,
    autoform: {
      type: 'hidden',
      label: false
    }
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

