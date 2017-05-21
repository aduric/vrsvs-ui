import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Avatar from 'material-ui/Avatar';
import {Card, CardActions, CardHeader, CardText, CardMedia, CardTitle} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import ReactPlayer from 'react-player'
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';


const ChallengeResponse = (props) => ({
  render() {
    return(
      <Card>
        <CardHeader
          title={this.props.responder.name}
          subtitle={this.props.response_vid === 'undefined' ? this.props.response_msg : 'replied...'}
          avatar={this.props.responder.avatar}
          actAsExpander={false}
          showExpandableButton={false}
        />
        {this.props.response_vid !== 'undefined' ?
        <CardMedia
          overlay={<CardTitle title={this.props.response_msg} />}
        >
          <ReactPlayer url={this.props.response_vid.downloadURL} playing loop/>
        </CardMedia> : null}
      </Card>
    )
  }
});

export default ChallengeResponse