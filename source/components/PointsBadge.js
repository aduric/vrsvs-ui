'use strict';

import autobind from 'autobind-decorator'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import _ from 'underscore'
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
import uuid from 'node-uuid';
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
  constructor(props) {
    super(props);
    this.state = {
      points: 0
    };
  }
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchPoints(this.props.fbase, this.props.userId))
  }
  render() {
      console.log('rendering points')
      console.log(this.props.points)
    return(
        <RaisedButton
            label={this.props.points}
            secondary={true}
            style={this.props.positionstyle}
            disableTouchRipple={true}/>
    );
  }
}

const getPoints = (users, user_id) => {
    var user = _.findWhere(users, {id: user_id});
    return user ? user.points: 0
}

const mapStateToProps = (state, ownProps) => {
    return {
        points: getPoints(state.users, ownProps.userId)
    }
}

export default connect(
  mapStateToProps
)(PointsBadge)