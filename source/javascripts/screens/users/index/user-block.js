var React = require('react');
var Backbone = require('backbone');
var ReactBackbone = require('react.backbone');

var UserBlock = React.createBackboneClass({
    render: function () {
        var user = this.props.user;
        var name = user.get('name');
        var text = user.get('text').url;
        var link = '/users/' + user.get('id');

        return (
            <div className="user-block">
                <a href={link}>
                    <h2>{name}</h2>
                </a>
                <p>{text}</p>
            </div>
        );
    }
});

module.exports = UserBlock;