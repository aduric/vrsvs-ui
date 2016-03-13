var Backbone = require('backbone');

var Router = Backbone.Router.extend({
    routes: {
        '':          'users#index',
        'users':     'users#index',
        'users/:id': 'users#show'
    }
});

module.exports = Router;