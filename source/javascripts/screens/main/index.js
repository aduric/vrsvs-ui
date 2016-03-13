var Backbone = require('backbone');
var BaseView = require('../../base-view');
var MainComponent = require('./component');

var MainView = BaseView.extend({
    component: function () {
        return new MainComponent({
            router: this.options.router
        });
    },

    pageRender: function () {
        $('#main-container').html(this.render());
    }
});

module.exports = MainView;