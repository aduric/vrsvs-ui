/** @jsx React.DOM */
var React = require('react');
var Backbone = require('backbone');
var ReactBackbone = require('react.backbone');

var MemberBlock = React.createBackboneClass({
    render: function () {
        var user = this.props.user;
        var username = user.get('username');
        var avatar = user.get('avatar').url;
        var link = '/users/' + user.get('id');

        return (
            <div className="user-block">
                <a href={link}>
                    <h2>{username}</h2>
                    <img src={avatar} alt={username} />
                </a>
            </div>
        );
    }
});

module.exports = UserBlock;