var React = require('react');
var Backbone = require('backbone');
var jQuery = require('jquery');

var BaseView = Backbone.View.extend({
    initialize: function () {
        jQuery.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
            // Your server goes below
            //options.url = 'http://localhost:8000' + options.url;
            options.url = 'http://localhost:1337' + options.url;
        });

    },

    component: function () {
        return null;
    },

    render: function () {
        React.renderComponent(this.component(), this.el);
        return this;
    }
});

module.exports = BaseView;