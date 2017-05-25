import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Avatar from 'material-ui/Avatar';
import {Card, CardActions, CardHeader, CardText, CardMedia, CardTitle} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import ReactPlayer from 'react-player'
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import ReactEmoji from 'react-emoji';


const ChallengeResponse = (props) => ({
  render() {
    return(
      <Card>
        <CardHeader
          title={this.props.responder.name}
          subtitle='replied...'
          avatar={this.props.responder.avatar}
          actAsExpander={false}
          showExpandableButton={false}
        />
        {this.props.response_vid !== 'undefined' ?
        <CardMedia>
          <ReactPlayer url={this.props.response_vid.downloadURL} controls playing loop muted playsinline />
        </CardMedia> : null}
          <CardText>
            {ReactEmoji.emojify(this.props.response_msg)}
          </CardText>
      </Card>
    )
  }
});

export default ChallengeResponse