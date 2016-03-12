/** @jsx React.DOM */
var React = require('react');
var ReactBackbone = require('react.backbone');

var MainComponent = React.createBackboneClass({
    render: function () {
        return (
            <div>
            <div id="main-container"></div>
            </div>
        );
    }
});

module.exports = MainComponent;