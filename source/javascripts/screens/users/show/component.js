/** @jsx React.DOM */
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

    handleLike: function(e) {
        e.preventDefault();
        var currentLikes = this.props.user.get('likesCount');
        this.props.user.save({ likesCount: currentLikes + 1 });
    },

    render: function() {
        var user = this.props.user;
        var username = user.get('username');
        var avatar = user.get('avatar').url;
        var likesCount = user.get('likesCount');

        return (
            <div className="user-container">
                <h1>{username}'s Profile</h1>
                <img src={avatar} alt={username} />
                <p>{likesCount} likes</p>
                <button className="like-button" onClick={this.handleLike}>
                    Like
                </button>
            </div>
        );
    }
});

module.exports = UserShowScreeen;