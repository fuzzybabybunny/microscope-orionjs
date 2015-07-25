<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

    - [
      {{author}}
      on {{submittedText}}
    ](#author%0A------on-submittedtext)
- [Meteor OrionJS with Microscope Tutorial](#meteor-orionjs-with-microscope-tutorial)
- [Purpose](#purpose)
- [Cloning Microscope](#cloning-microscope)
- [Download OrionJS](#download-orionjs)
- [Initial Impressions](#initial-impressions)
- [Creating Users](#creating-users)
- [Adding and Removing Roles from Users](#adding-and-removing-roles-from-users)
  - [Getting Roles](#getting-roles)
  - [Setting Roles](#setting-roles)
- [Adding Collections to OrionJS](#adding-collections-to-orionjs)
- [Updating Collection Documents](#updating-collection-documents)
  - [Schemas](#schemas)
- [Adding Comments Collection](#adding-comments-collection)
- [Custom Input Types (Widgets)](#custom-input-types-widgets)
  - [Adding Summernote](#adding-summernote)
  - [Orion Attributes](#orion-attributes)
  - [Adding Images (none)](#adding-images-none)
- [Custom Tabular Values](#custom-tabular-values)
- [Relationships (none)](#relationships-none)
- [Custom Functions (none)](#custom-functions-none)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Meteor OrionJS with Microscope Tutorial ##

## Purpose ##

I haven't been able to find a good tutorial that goes through the end-to-end setup for OrionJS, so I decided to create this tutorial both as a learning resource for others but also as a way for me to keep track of my own progress as I poke around OrionJS and figure out how to do stuff with it.

There will be cursing in this tutorial.

## Cloning Microscope ##

Most Meteor developers should be familiar with Microscope, the social news app which the user codes along with when following the [Discover Meteor](https://www.discovermeteor.com/) tutorial book. If you haven't read and coded along with this book, do it. Now.

As of this writing, Microscope does not have a backend admin system in place to manage its data, so I thought that it would be the ideal candidate for creating a tutorial on how to get OrionJS working.

First, go to https://github.com/DiscoverMeteor/Microscope and clone the repo.

```
git clone git@github.com:DiscoverMeteor/Microscope.git
cd Microscope
meteor update
```

## Download OrionJS ##

OrionJS is designed to work nicely with Bootstrap, which is perfect because Microscope does as well.

```
meteor add orionjs:core fortawesome:fontawesome orionjs:bootstrap
```

When you do `meteor list` you should see (versions may be different):

```

accounts-password            1.1.1  Password support for accounts
audit-argument-checks        1.0.3  Try to detect inadequate input sanitization
fortawesome:fontawesome      4.3.0  Font Awesome (official): 500+ scalable vector icons, customizable via CSS, Retina friendly
ian:accounts-ui-bootstrap-3  1.2.76  Bootstrap-styled accounts-ui with multi-language support.
iron:router                  1.0.9  Routing specifically designed for Meteor
orionjs:bootstrap            1.2.1  A simple theme for orion
orionjs:core                 1.2.0  Orion
sacha:spin                   2.3.1  Simple spinner package for Meteor
standard-app-packages        1.0.5  Moved to meteor-platform
twbs:bootstrap               3.3.5  The most popular front-end framework for developing responsive, mobile first projects on the web.
underscore                   1.0.3  Collection of small helpers: _.map, _.each, ...

```
## Initial Impressions ##

Great! Now that we've added all these packages, let's start up Microscope and see how fucked up we made everything.
```
meteor
```
Then point your browser to `http://localhost:3000/`

Everything looks like it should:

![enter image description here](https://lh3.googleusercontent.com/ADsFjG6v1AlTMaULUSVMG9qEBKrCQ902sUXuQI5N1dU=s0 "Screenshot from 2015-07-23 22:54:16.png")

Now let's go to `http://localhost:3000/admin`

![enter image description here](https://lh3.googleusercontent.com/yjUHPNxc1wclW3M-pPFIk1J_F8IglciV8NU85nIwNE0=s0 "Screenshot from 2015-07-23 22:56:17.png")

Looks like shit.

The reason this is here is because there's a hidden red alert box that is floating right. It's a style that was defined in Microscope so let's go remove it. Comment out that line of code.

```css
/client/stylesheets/style.css

.alert {
          animation: fadeOut 2700ms ease-in 0s 1 forwards;
  -webkit-animation: fadeOut 2700ms ease-in 0s 1 forwards;
     -moz-animation: fadeOut 2700ms ease-in 0s 1 forwards;
  width: 250px;
/*  float: right;*/
  clear: both;
  margin-bottom: 5px;
  pointer-events: auto;
}
```
This is going to make Microscope look crappier but I'm shit at CSS so fuckit.

![enter image description here](https://lh3.googleusercontent.com/UwazTdhYJp0Rx_aYIbwJp52UOQbhLPfv5VvqrZJH8jo=s0 "Screenshot from 2015-07-23 23:10:09.png")

Better. The invisible alert box is still taking up space but I can't be fucked to do anything about it.

## Creating Users ##

Looks like we need to create users and log in first before we can see the OrionJS backend. 

Go here and replace the original `// create two users` code with this:

(Don't just copy this code and replace everything in `fixtures.js` with this since it's just partial code.)

```javascript
/server/fixtures.js

// Fixture data 
if (Posts.find().count() === 0) {
  var now = new Date().getTime();
  
  // create two users

  var sachaId = Accounts.createUser({
    profile: {
      name: 'Sacha Greif'
    },
    username: "sacha",
    email: "sacha@example.com",
    password: "123456",
  });

  var tomId = Accounts.createUser({
    profile: {
      name: 'Tom Coleman'
    },
    username: "tom",
    email: "tom@example.com",
    password: "123456",
  });

  var sacha = Meteor.users.findOne(sachaId);
  var tom = Meteor.users.findOne(tomId);
  
  var telescopeId = Posts.insert({
    title: 'Introducing Telescope',
    userId: sacha._id,
    author: sacha.profile.name,
    url: 'http://sachagreif.com/introducing-telescope/',
    submitted: new Date(now - 7 * 3600 * 1000),
    commentsCount: 2,
    upvoters: [], votes: 0
  });
  
  Comments.insert({
    postId: telescopeId,
    userId: tom._id,
    author: tom.profile.name,
    submitted: new Date(now - 5 * 3600 * 1000),
    body: 'Interesting project Sacha, can I get involved?'
  });

```

Shut down Meteor with `Ctrl+C` and do a `meteor reset` and start it back up again with `meteor`.

Now let's log in **as Sacha** and see what happens. Once logged in, click on the `Accounts` link on the left.

![enter image description here](https://lh3.googleusercontent.com/J5K9jjcJU_0KKQVfBcqfXiUNrqcto6slnUyOZ6O1Lks=s0 "Screenshot from 2015-07-23 23:41:12.png")

- Nice. Absolutely nothing shows up except the `Accounts` collection. Microscope has a `Posts` collection as well as a `Comments` collection.

- ... and WTF. Tom is an `admin` but Sacha is not. We didn't even tell Meteor to make Tom an `admin` in my fixtures code, so what the hell happened?

It turns out that by default, OrionJS will create a user `Role` called `admin` and if there is no `admin`,  will assign the **first** user created with `Accounts.createUser` as an `admin`. Remember this so you're not creating accidental admin users in your fixtures code.

I can't spell Sasha's name for shit so let's remove him as admin and have Tom as admin. Because ignoring your spelling weaknesses make them go away.

## Adding and Removing Roles from Users ##

Unlike other user roles packages, the `role` of the user in `OrionJS` isn't stored on the `user` object itself. You won't find something like:

```javascript
{
  username: 'cletus',
  email: 'ileik@mysister.com',
  roles: [
    'admin',
    'parent',
    'varmit_hunter'
  ]
}
```
Instead, each separate `role` is stored in a `Roles` collection and the `userId` of the user is referenced along with an array containing their `roles`.

### Getting Roles###
Let's fuck around in the Chrome console before we do anything. While in the `Accounts` admin page, do:

```console
var id = Meteor.users.findOne({username: "sacha"})._id;
Roles.userHasRole(id, "admin")

true
```
It should return `true`. We got Sesha's userId and then used that ID to check if he has the role of "admin."

Likewise, each user has a `roles()` and `hasRole()` method on its object:

```console
// gets the currently logged in user, which should be Sassha
var user = Meteor.user();
user.roles();

["admin"]

user.hasRole("admin")

true
```
So that's how you check if a user has a role you want.

Currently there doesn't seem to be a method to check *which* users have a certain role.

###Setting Roles###

We need to give Tom the role of `admin`.

In Chrome console:
```
var user = Meteor.users.findOne({username: "tom"});
Roles.addUserToRoles( user._id ,  ["admin"] );

VM11445:2 Uncaught TypeError: Roles.addUserToRoles is not a function(anonymous function)
```
DUH. You can't define roles on the client. Because that's dumb.

Let's make a new file called `/server/admin.js`
```javascript
/server/admin.js

var tom = Meteor.users.findOne({username: 'tom'});
Roles.addUserToRoles( tom._id ,  ["admin"] );
```

If we go back to the OrionJS admin console we should see that now Tom and Sache are both admins. 

Now we want to remove Sachet as an admin.

```javascript
/server/admin.js

var tom = Meteor.users.findOne({username: 'tom'});
Roles.addUserToRoles( tom._id ,  ["admin"] );

var nameIcantSpel = Meteor.users.findOne({username: 'sacha'});
Roles.removeUserFromRoles( nameIcantSpel._id, ["admin"] );
```
You'll notice that you can log into `OrionJS` as Sacsh, but you won't see `Accounts` on the sidebar since he's no longer an `admin`. So log in as Tom instead.
 
And now Tom is the only admin! 

![enter image description here](https://lh3.googleusercontent.com/2cXRDE9AILHEWVhLumU2Fei-Tzf67Uwl8rOCZGfcsOk=s0 "Screenshot from 2015-07-24 00:26:13.png")

Spelling weakness successfully ignored!

##Adding Collections to OrionJS##

Here's where this tutorial gets less horrible.

Microscope has a `Posts` and `Comments` collection, but both aren't visible yet in the admin thingy. That's because they're not `Orion` collections yet.

Let's make them appear.

```javascript
// This is what it used to be:
// Posts = new Mongo.Collection('posts');

// Instead let's do:
Posts = new orion.collection('posts', {
  singularName: 'post', // The name of one of these items
  pluralName: 'posts', // The name of more than one of these items
  link: {
    // *
    //  * The text that you want to show in the sidebar.
    //  * The default value is the name of the collection, so
    //  * in this case it is not necessary.
     
    title: 'Posts' 
  },
  /**
   * Tabular settings for this collection
   */
  tabular: {
    // here we set which data columns we want to appear on the data table
    // in the CMS panel
    columns: [
      { 
        data: "title", 
        title: "Title" 
      },{ 
        data: "author", 
        title: "Author" 
      },{ 
        data: "submitted", 
        title: "Submitted" 
      },
    ]
  }
});

Posts.allow({
  update: function(userId, post) { return ownsDocument(userId, post); },
  remove: function(userId, post) { return ownsDocument(userId, post); },
});

Posts.deny({
  update: function(userId, post, fieldNames) {
    // may only edit the following two fields:
```
If you go back to the Microscope home page you'll see that everything appears to have remained normal. Orion collections are just extended Mongo collections. 

Now it looks like we got `Posts` appearing in `OrionJS`.

![enter image description here](https://lh3.googleusercontent.com/6T99yNvDLm2qxDp-ZLF8W0V9L64Op8W8-UAvuOQlEqo=s0 "Screenshot from 2015-07-24 00:37:51.png")

Reactive search works. Sorting columns is working. Pagination is working.

But when we click on a table item we get:

![enter image description here](https://lh3.googleusercontent.com/UPlVwdKLDXf2UBsX3JqLdTpoG989DelOau61HHB84MA=s0 "Screenshot from 2015-07-24 00:39:06.png")

Errors and shit.

Luckily the error is pretty descriptive. This form needs either a schema or a collection.

##Updating Collection Documents##

When we click on one of the table items we expect to go to an update form for that particular item. `OrionJS` uses the vastly powerful `aldeed:autoform` package to generate its forms. `aldeed:autoform` in turn uses the `aldeed:simple-schema` package to know *how* to generate its forms. 

###Schemas###

Schemas are these little (tee-hee) things that define how the data in your database should be. If you've got a `User` document with a `first_name` property, you'd expect the value to be a `type: String`. If having a first name is critical, you'd want it to be `optional: false`. 

We use schemas to keep our data consistent. MongoDB is inherently a schema-less database. It would happily allow you to fuck yourself over by storing an array of booleans inside the `first_name` property of your `user` document, for instance. And then you go to access it and your wife leaves you (probably not your husband because he's clueless).

So this is why people decided to make a schema package for Meteor. They love you and want happy families.

Let's start by defining a schema for our `Posts` collection all the way at the very bottom of `/lib/collections/posts.js`. I'm too lazy to type so read the comments.


```javascript
/lib/collections/posts.js

// Rest of the code above

      $addToSet: {upvoters: this.userId},
      $inc: {votes: 1}
    });
    
    if (! affected)
      throw new Meteor.Error('invalid', "You weren't able to upvote that post");
  }
});

/**
 * Now we will define and attach the schema for this collection.
 * Orion will automatically create the corresponding form.
 */
Posts.attachSchema(new SimpleSchema({
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
    label: 'URL',
    regEx: SimpleSchema.RegEx.Url
  },
  // autoform determines other aspects for how the form is generated
  // In this case we're making this field hidden from view
  userId: {
    type: String,
    optional: false,
    autoform: {
      type: "hidden",
      label: false
    },
  },
  author: {
    type: String,
    optional: false,
  },
  // 'type: Date' means that this field is expecting a data as an entry
  submitted: {
    type: Date,
    optional: false,
  },
  commentsCount: {
    type: Number,
    optional: false
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
```

I told you schemas are little, right?

Save and try clicking on a post item again.

![enter image description here](https://lh3.googleusercontent.com/xUKRDnSsT3THV3fi-HocLdl3uAwkTyt_YRC_nswc8eA=s0 "Screenshot from 2015-07-24 03:57:39.png")

Ohhhhh... shit! It's almost like I... planned... things.

Play around with this form and look at how the `schema` we defined directly correlates to how this form was generated.

- make the `Post Title` blank and save the form
- remove `http` in `URL` and save the form
- click on the `Submitted` field to see how `type: Date` works

##Adding Comments Collection##

How about we do the same thing to the `Comments` collection as we did to the `Posts` collection?

I'll race you. Ready? Go.
Done I WIN.

```javascript
/lib/collections/comments.js

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
        title: "Post ID" 
      },{ 
        data: "submitted", 
        title: "Submitted" 
      },
    ]
  }
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
 * Now we will define and attach the schema for that collection.
 * Orion will automatically create the corresponding form.
 */
Comments.attachSchema(new SimpleSchema({
  postId: {
    type: String,
    optional: false,
    label: 'Post ID'
  },
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
  body: {
    type: String,
    optional: false,
  }
}));
```

![enter image description here](https://lh3.googleusercontent.com/LROiQg6mMP5rpG844QNv-njdxyB5ltffUASPpbx606M=s0 "Screenshot from 2015-07-24 04:33:38.png")

![enter image description here](https://lh3.googleusercontent.com/89A5cA83MF5WZn-69hoq2yqPvh5hvllTXyTpuQMuJJU=s0 "Screenshot from 2015-07-24 04:34:43.png")

How about we do something even more CRAZY and add in a text editor for the `Body` field?

##Custom Input Types (Widgets)##

First, some background.

Forms have standard input types. Checkboxes. Radio buttons. Text. These are all supported out of the box by `aldeed:autoform`. But things like text editors (with buttons for selecting font type, size, color, etc) are custom, and `autoform` gives us a way to define our own widgets in the `schema` so that autoform can generate that form for us.

###Adding Summernote###

First do `meteor add orionjs:summernote`

Now do this to the `body` property:

```javascript
/lib/collections/comments.js

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
  postId: {
    type: String,
    optional: false,
    label: 'Post ID'
  },
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
```
Click on the comment by Sashi in the OrionJS admin panel to see what's up.

![enter image description here](https://lh3.googleusercontent.com/unDs4gjPq22hcncc11LY_Cp9eTD5RBh9G6IChwiVMYo=s0 "Screenshot from 2015-07-24 18:30:25.png")

Niiiice.

###Orion Attributes###

So what the hell is the `orion.attribute` we adding as the value for the `body` key in our schema? How about we just use our Chrome Console? 
```
orion.attribute('summernote', {
  label: 'Body'
})

Object {label: "Body", type: function, orionAttribute: "summernote", ...}
autoform: Object
label: "Body"
orionAttribute: "summernote"
type: function String() { [native code] }
__proto__: Object
```
Oh. looks like by adding the `orionjs:summernote` package we got access to this method that returns a pre-made object for us that we can conveniently use in our schema. Remember that `aldeed:autoform` uses the schema to figure out *how* to generate form items, so this attribute did all the defining-the-input-widget stuff for us.

I'm going to make this comment fabulous. ROYGBIV and Comic Sans the shit out of that comment, Sechie.

![enter image description here](https://lh3.googleusercontent.com/eVMz0FVebRmy05ZPPU9p3b_91o56QjbK7GfgK0mIvaA=s0 "Screenshot from 2015-07-24 18:37:15.png")

Save it.

Remember that this comment is now in HTML, so we have to add triple spacebars `{{{ TRIPLEX #vindiesel }}}` in our `comment_item.html` to make sure Spacebars will render the HTML properly.

```html
/client/templates/comments/comment_item.html

<template name="commentItem">
  <li>
    <h4>
      <span class="author">{{author}}</span>
      <span class="date">on {{submittedText}}</span>
    </h4>
    <p>{{{ body }}}</p>
  </li>
</template>
```
Let's survey the improvements by going to the main page and clicking on the comments for the `Introducing Telescope` post.

![enter image description here](https://lh3.googleusercontent.com/8ja1upLimMWalVzUCAMWNmtULEb-xpvPzOiih5l99wg=s0 "Screenshot from 2015-07-24 18:46:03.png")

Beauty. 

###Adding Images (none)###
##Custom Tabular Values##
##Relationships (none)##
##Custom Functions (none)##