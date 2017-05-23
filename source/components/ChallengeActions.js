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

class ChallengeActions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      status: props.status
    }
  }
  isIssued() {
    return this.state.status === "ISSUED"
  }
  isAccepted() {
    return this.state.status === "ACCEPTED"
  }
  handleAccept() {
    console.log(this.props.id);
    console.log("IssuerId");
    console.log(this.props.issuer.id);
    this.props.dispatch(acceptChallenge(this.props.id));
    var newPoints = this.props.issuer.points == undefined ? 1 : this.props.issuer.points + 1
    this.props.dispatch(updatePoints(this.props.id, 'issuer', newPoints, 'accepting'));
    this.setState({status: 'ACCEPTED'})
  }
  handleReject() {
    this.props.dispatch(rejectChallenge(this.props.id));
    this.setState({status: 'REJECTED'})
  }
  handleComplete() {
    this.props.dispatch(completeChallenge(this.props.id));
    var newPoints = this.props.participant.points == undefined ? 3 : this.props.participant.points + 3
    this.props.dispatch(updatePoints(this.props.id, 'participant', newPoints, 'completing'));
    this.setState({status: 'COMPLETED'})
  }
  handleFail() {
    this.props.dispatch(failChallenge(this.props.id));
    this.setState({status: 'FAILED'})
  }
  issuedActions() {
    return(
    <CardActions>
      <RaisedButton label="Accept" primary={true} style={style} onTouchTap={this.handleAccept.bind(this)} />
      <RaisedButton label="Reject" secondary={true} style={style} onTouchTap={this.handleReject.bind(this)} />
    </CardActions>
    )    
  }
  acceptedActions() {
    return(
    <CardActions>
      <RaisedButton label="Complete" primary={true} style={style} onTouchTap={this.handleComplete.bind(this)} />
      <RaisedButton label="Fail" secondary={true} style={style} onTouchTap={this.handleFail.bind(this)} />
    </CardActions>
    )      
  }
  completedActions() {
    if(this.state.status === 'COMPLETED') {
      return(
        <Check style={iconStyles} color={green500}/>
      )
    } else {
      return(
        <Close style={iconStyles} color={red500}/>
      )
    }     
  }
  render() {
    if(this.isIssued()) {
      return this.issuedActions();
    } else if(this.isAccepted()) {
      return this.acceptedActions();
    } else {
      return this.completedActions();     
    }
  }
}

export default connect()(ChallengeActions);