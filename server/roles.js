var tom = Meteor.users.findOne({username: 'tom'});
Roles.addUserToRoles( tom._id ,  ["admin"] );

var nameIcantSpel = Meteor.users.findOne({username: 'sacha'});
Roles.removeUserFromRoles( nameIcantSpel._id, ["admin"] );