var BaseView = require('../../../base-view');
var UserScreen = require('./component');

var UserView = BaseView.extend({
    component: function () {
        return new UserScreen({
            user: this.options.user
        });
    }
});

module.exports = UserView;