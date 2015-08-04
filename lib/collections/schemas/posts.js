/**
 * Now we will attach the schema for that collection.
 * Orion will automatically create the corresponding form.
 */
Posts.attachSchema(new SimpleSchema({

  comments: orion.attribute('hasMany', {
    type: [String],
    label: 'Comments for this Post',
    // optional is true because you can have a post without comments
    optional: true
  }, {
    collection: Comments,
    titleField: 'body',
    publicationName: 'someOtherRandomString'
  }),

  // We use `label` to put a custom label for this form field
  // Otherwise it would default to `Title`
  // 'optional: false' means that this field is required
  // If it's blank, the form won't submit and you'll get a red error message
  // 'type' is where you can set the expected data type for the 'title' key's value
  title: {
    type: String,
    optional: false,
    label: 'Post Title'
  },
  // regEx will validate this form field according to a RegEx for a URL
  url: {
    type: String,
    optional: false,
    unique: true,
    label: 'URL',
    regEx: SimpleSchema.RegEx.Url,
    // custom: function () {
    // if (Meteor.isClient && this.isSet) {
    //   Meteor.call("postWithSameLink", this.value, function (error, result) {
    //     if (!result) {
    //       Posts.simpleSchema().namedContext("postSubmitForm").addInvalidKeys([{name: "url", type: "notUnique"}]);
    //     }
    //   });
    // }
    // }
  },
  submitted: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date()};
      } else {
        this.unset();
      }
    }
  },
  userId: orion.attribute('hasOne', {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: false,
    index: 1,
    autoValue: function(){
      if(this.userId && this.isInsert){
        return this.userId;
      }
    }
  }, {
    collection: Meteor.users,
    // the key whose value you want to show for each Post document on the Update form
    titleField: 'profile.name',
    publicationName: 'sfsfscsadf',
  }),
  author: {
    type: String,
    optional: false,
    autoValue: function(){
      var user = Meteor.users.findOne({_id: this.field('userId').value});
      return user.profile.name;
    },
    autoform: {
      type: 'hidden',
      label: false
    }
  },
  commentsCount: {
    type: Number,
    optional: false,
    autoValue: function(){
      if ( this.isInsert ){
        return 0;
      };
    }
  },
  // 'type: [String]' means this key's value is an array of strings'
  upvoters: {
    type: [String],
    optional: true,
    autoform: {
      disabled: true,
      label: false
    },
  },
  votes: {
    type: Number,
    optional: true
  },
}));