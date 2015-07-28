// check that the userId specified owns the documents
ownsDocument = function(userId, doc) {
	console.log("asdfs: ", Roles.userHasRole(userId, "admin"))
  return doc && doc.userId === userId || Roles.userHasRole(userId, "admin");
}