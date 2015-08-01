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
  
  Comments.insert({
    postId: telescopeId,
    userId: sacha._id,
    author: sacha.profile.name,
    submitted: new Date(now - 3 * 3600 * 1000),
    body: "<p><span style=\"font-family: 'Comic Sans MS';\"><span style=\"font-size: 18px; background-color: rgb(255, 0, 0);\">You</span><span style=\"font-size: 18px;\"> </span><span style=\"font-size: 18px; background-color: rgb(255, 156, 0);\">sure</span><span style=\"font-size: 18px;\"> </span><span style=\"font-size: 18px; background-color: rgb(255, 255, 0);\">can</span><span style=\"font-size: 18px;\"> </span><span style=\"font-size: 18px; background-color: rgb(0, 255, 0);\">Tom</span><span style=\"font-size: 18px; background-color: rgb(0, 0, 255);\">!!!</span></span></p>"

  });
  
  Posts.insert({
    title: 'Meteor',
    userId: tom._id,
    author: tom.profile.name,
    url: 'http://meteor.com',
    submitted: new Date(now - 10 * 3600 * 1000),
    commentsCount: 0,
    upvoters: [], votes: 0
  });
  
  Posts.insert({
    title: 'The Meteor Book',
    userId: tom._id,
    author: tom.profile.name,
    url: 'http://themeteorbook.com',
    submitted: new Date(now - 12 * 3600 * 1000),
    commentsCount: 0,
    upvoters: [], votes: 0
  });
  
  for (var i = 0; i < 10; i++) {
    Posts.insert({
      title: 'Test post #' + i,
      author: sacha.profile.name,
      userId: sacha._id,
      url: 'http://google.com/?q=test-' + i,
      submitted: new Date(now - i * 3600 * 1000 + 1),
      commentsCount: 0,
      upvoters: [], votes: 0
    });
  }
};

