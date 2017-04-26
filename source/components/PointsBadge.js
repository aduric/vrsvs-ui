'use strict';

import autobind from 'autobind-decorator'
import React, { PropTypes } from 'react'
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import UserChallenge from './UserChallenge'
import { fetchPoints } from '../actions'
import {
  blue300,
  indigo900,
  orange200,
  deepOrange300,
  pink400,
  purple500,
  cyan500
} from 'material-ui/styles/colors';

const style = {
  "min-width": "0px",
  "margin": "0px"
};

class PointsBadge extends React.Component {
  render() {
    return(
        <RaisedButton
            label={this.props.points}
            secondary={true}
            style={this.props.positionstyle}
            disableTouchRipple={true}/>
    );
  }
}

export default PointsBadge