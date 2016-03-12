var Backbone = require('backbone');
var BackboneRouteControl = require('backbone-route-control');

var Router = BackboneRouteControl.extend({
    routes: {
        '':          'users#index',
        'users':     'users#index',
        'users/:id': 'users#show'
    }
});

module.exports = Router;