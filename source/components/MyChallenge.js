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

const MyChallenge = (props) => ({
  render() {
    return(
      <div>
        <Card>
          <CardHeader
            avatar={this.props.issuer.avatar}
            title={"You have challenged " + this.props.participant.name}
            subtitle={this.props.description}
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
        </Card>
      </div>
    )
  }
});

export default MyChallenge