import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import ChallengeResponseList from './ChallengeResponseList'
import ChallengeResponseForm from './ChallengeResponseForm'
import { acceptChallenge, rejectChallenge, completeChallenge, failChallenge, updatePoints } from '../actions'
import {Card, CardActions, CardHeader, CardText, CardMedia} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import Check from 'material-ui/svg-icons/navigation/check';
import Close from 'material-ui/svg-icons/navigation/close';

const style = {
  margin: 12,
};

import {red500, green500, blue500} from 'material-ui/styles/colors';

const iconStyles = {
  marginLeft: 12,
};

let ChallengeActions = (challenge) => ({
  isIssued() {
    return challenge.status === "ISSUED"
  },
  isAccepted() {
    return challenge.status === "ACCEPTED"
  },
  handleAccept() {
    console.log(challenge.id);
    console.log("IssuerId");
    console.log(challenge.issuer.id);
    this.props.dispatch(acceptChallenge(challenge.id));
    this.props.dispatch(updatePoints(challenge.id, 'issuer', 1, 'accepting'));
  },
  handleReject() {
    this.props.dispatch(rejectChallenge(challenge.id));
  },
  handleComplete() {
    this.props.dispatch(completeChallenge(challenge.id));
    this.props.dispatch(updatePoints(challenge.id, 'participant', 3, 'completing'));
  },
  handleFail() {
    this.props.dispatch(failChallenge(challenge.id));
  },
  issuedActions() {
    return(
    <CardActions>
      <RaisedButton label="Accept" primary={true} style={style} onTouchTap={this.handleAccept.bind(this)} />
      <RaisedButton label="Reject" secondary={true} style={style} onTouchTap={this.handleReject.bind(this)} />
    </CardActions>
    )    
  },
  acceptedActions() {
    return(
    <CardActions>
      <RaisedButton label="Complete" primary={true} style={style} onTouchTap={this.handleComplete.bind(this)} />
      <RaisedButton label="Fail" secondary={true} style={style} onTouchTap={this.handleFail.bind(this)} />
    </CardActions>
    )      
  },
  completedActions() {
    if(challenge.status === 'COMPLETED') {
      return(
        <Check style={iconStyles} color={green500}/>
      )
    } else {
      return(
        <Close style={iconStyles} color={red500}/>
      )
    }     
  },
  render() {
    if(this.isIssued()) {
      return this.issuedActions();
    } else if(this.isAccepted()) {
      return this.acceptedActions();
    } else {
      return this.completedActions();     
    }
  }
})

export default connect()(ChallengeActions);