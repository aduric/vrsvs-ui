import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import ChallengeResponseList from './ChallengeResponseList'
import ChallengeResponseForm from './ChallengeResponseForm'
import ChallengeActions from './ChallengeActions'
import { acceptChallenge, rejectChallenge, completeChallenge, failChallenge, updatePoints } from '../actions'
import {Card, CardActions, CardHeader, CardText, CardMedia} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';

const style = {
  margin: 12,
};

const Challenge = (props) => ({
  render() {
    return(
      <div>
        <Card>
          <CardHeader
            avatar={this.props.issuer.avatar}
            title={this.props.issuer.name + " challenged you"}
            subtitle={this.props.description}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardActions expandable={true}>
              <ChallengeResponseForm id={this.props.id} responder={this.props.participant}/>
              <Divider inset={true} />
              <ChallengeResponseList id={this.props.id}/>
          </CardActions>
          <ChallengeActions {...this.props}/>
        </Card>
      </div>
    )
  }
});

export default Challenge