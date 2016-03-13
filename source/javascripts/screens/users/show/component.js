var React = require('react');
var Backbone = require('backbone');
var ReactBackbone = require('react.backbone');
var User = require('../../../models/user');

var UserShowScreen = React.createBackboneClass({
    mixins: [
        React.BackboneMixin('user', 'change'),
    ],

    getInitialState: function() {
        return {
            liked: false
        }
    },

    render: function() {
        var user = this.props.user;
        var name = user.get('name');
        var text = user.get('text').url;
        var points = user.get('points');

        return (
            <div className="user-container">
                <h1>{name}'s Profile</h1>
                <p>{points} points</p>
                <button className="challenge-button" onClick={this.handleChallenge}>
                    Challenge
                </button>
            </div>
        );
    }
});

module.exports = UserShowScreen;