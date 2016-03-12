/** @jsx React.DOM */
var React = require('react');
var ReactBackbone = require('react.backbone');
var UserBlock = require('.user-block');

var UsersIndexScreen = React.createBackboneClass({
    mixins: [
        React.BackboneMixin('users', 'change')
    ],

    render: function() {
        var userBlocks = this.props.users.map(function(user) {
            return <UserBlock user={user} />
        });

        return (
            <div className="users-container">
                <h1>Users</h1>
                {userBlocks}
            </div>
        );
    }
});

module.exports = UsersIndexScreen;