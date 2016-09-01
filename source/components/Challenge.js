import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { acceptChallenge, rejectChallenge, completeChallenge, failChallenge, updatePoints } from '../actions'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12,
};

let ChallengeActions = ({ id, status, issuerId, participantId }) => ({
  isIssued() {
    return status == "ISSUED"
  },
  isAccepted() {
    return status == "ACCEPTED"
  },
  handleAccept() {
    console.log(id);
    console.log("IssuerId");
    console.log(issuerId);
    this.props.dispatch(acceptChallenge(id));
    this.props.dispatch(updatePoints(issuerId, 1));
  },
  handleReject() {
    this.props.dispatch(rejectChallenge(id));
  },
  handleComplete() {
    this.props.dispatch(completeChallenge(id));
    this.props.dispatch(updatePoints(participantId, 3));
  },
  handleFail() {
    this.props.dispatch(failChallenge(id));
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

ChallengeActions.PropTypes = {
  id: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  participantId: PropTypes.string.isRequired,
  issuerId: PropTypes.string.isRequired,
}

ChallengeActions = connect()(ChallengeActions);

const Challenge = ({ id, issuer, participant, description, status }) => ({
  render() {
    return(
      <Card>
        <CardHeader
          title={description}
          subtitle={status}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          <p>{id}, {issuer}, {participant}, {description}, {status}</p>
        </CardText>
        <ChallengeActions id={id} status={status} issuerId={issuer} participantId={participant} />
      </Card>
    )
  }
});

Challenge.propTypes = {
  id: PropTypes.string.isRequired, 
  issuer: PropTypes.string.isRequired,
  participant: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired
}

export default Challenge