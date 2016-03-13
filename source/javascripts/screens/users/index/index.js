var BaseView = require('../../../base-view');
var UsersIndexScreen = require('./component');

var UsersIndexScreen = BaseView.extend({
    component: function () {
        return new UsersIndexScreen({
            users: this.options.users
        });
    }
});

module.exports = UsersIndexScreen;