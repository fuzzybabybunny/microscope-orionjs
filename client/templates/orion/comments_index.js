ReactiveTemplates.onCreated('collections.comments.index', function() {
  
  var sub = this.subscribe('posts', {sort: {submitted: -1, _id: -1}, limit: 0});

  if( sub.ready() ){
  	debugger
  	console.log('subscription ready!');
  };

});