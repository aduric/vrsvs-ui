import React, { PropTypes as T } from 'react'
import Paper from 'material-ui/Paper';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

class Lock extends React.Component {
  getChildContext() {
    return {muiTheme: getMuiTheme(baseTheme)};
  }
  render() {
    let children = null;
    if (this.props.children) {
      children = React.cloneElement(this.props.children, {
        auth: this.props.route.auth //sends auth instance from route to children
      })
    }

    return (
      <Paper zDepth={1}>
        <img src="https://cdn.auth0.com/styleguide/1.0.0/img/badge.svg" />
        {children}
      </Paper>
    )
  }
}

Lock.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};

export default Lock;