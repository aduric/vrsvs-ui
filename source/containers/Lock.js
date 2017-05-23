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
            <svg style={{width: "48px", height: "48px"}}>
              <use xlinkHref='svg/vrsvs_icon.svg#Bear_logo'/>
            </svg>
        {children}
      </Paper>
    )
  }
}

Lock.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};

export default Lock;