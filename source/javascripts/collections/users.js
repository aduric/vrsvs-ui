var Backbone = require('backbone');

var UsersCollection = Backbone.Collection.extend({
    url: '/users'
});

//module.exports = UsersCollection;