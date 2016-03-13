var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');

var BaseView = Backbone.View.extend({
    initialize: function (options) {
        this.options = options || {};
        $.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
            // Your server goes below
            //options.url = 'http://localhost:8000' + options.url;
            options.url = 'http://localhost:1337/api' + options.url;
        });

    },

    component: function () {
        return null;
    },

    render: function () {
        ReactDOM.render(React.createElement(this.component()), this.el);
        return this;
    }
});

module.exports = BaseView;