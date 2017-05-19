import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import ChallengeResponseList from './ChallengeResponseList'
import ChallengeResponseForm from './ChallengeResponseForm'
import { acceptChallenge, rejectChallenge, completeChallenge, failChallenge, updatePoints } from '../actions'
import {Card, CardActions, CardHeader, CardText, CardMedia} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';

const style = {
  margin: 12,
};

let ChallengeActions = (challenge) => ({
  isIssued() {
    return status == "ISSUED"
  },
  isAccepted() {
    return status == "ACCEPTED"
  },
  handleAccept() {
    console.log(challenge.id);
    console.log("IssuerId");
    console.log(challenge.issuer.id);
    this.props.dispatch(acceptChallenge(challenge));
    this.props.dispatch(updatePoints(challenge.issuer, 1));
  },
  handleReject() {
    this.props.dispatch(rejectChallenge(challenge));
  },
  handleComplete() {
    this.props.dispatch(completeChallenge(challenge));
    this.props.dispatch(updatePoints(challenge.participant, 3));
  },
  handleFail() {
    this.props.dispatch(failChallenge(challenge));
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
  render() {
    if(this.isIssued()) {
      return this.issuedActions();
    } else if(this.isAccepted) {
      return this.acceptedActions();
    }
  }
})

ChallengeActions = connect()(ChallengeActions);

const Challenge = (props) => ({
  render() {
    return(
      <div>
        <Card>
          <CardHeader
            title={<div><Avatar src={this.props.issuer.avatar} /> {this.props.description}</div>}
            subtitle={this.props.status}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardMedia
            expandable={true}>
            <div>
              <ChallengeResponseForm id={this.props.id} responder={this.props.participant}/>
              <Divider inset={true} />
              <ChallengeResponseList id={this.props.id}/>
            </div>
          </CardMedia>
          <ChallengeActions {...this.props}/>
        </Card>
      </div>
    )
  }
});

export default Challenge