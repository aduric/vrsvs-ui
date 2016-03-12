var Backbone = require('backbone');

var Router = require('./router');
var MainView = require('./screens/main/index');

var UsersController = require('./controllers/user');

Backbone.$ = $;

var Application = function() {
    this.initialize();
};

Application.prototype.initialize = function() {
    this.controllers = {
        users: new UsersController({ app: this })
    };

    this.router = new Router({
        app: this,
        controllers: this.controllers
    });

    this.mainView = new MainView({
        el: $('#app'),
        router: this.router
    });

    this.showApp();
};

Application.prototype.showApp = function() {
    this.mainView.render();
    Backbone.history.start({ pushState: true });
};

module.exports = Application;
