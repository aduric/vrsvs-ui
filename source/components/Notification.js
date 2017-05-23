import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Avatar from 'material-ui/Avatar';
import {Card, CardActions, CardHeader, CardText, CardMedia, CardTitle} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import ReactPlayer from 'react-player'
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import {List, ListItem} from 'material-ui/List';


const Notification = (props) => ({
  render() {
    const { resource, message, subject, object, timestamp } = this.props;
    const d = new Date(timestamp);
    return(
      <ListItem
        primaryText={eval(message)}
        secondaryText={`${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`}
        leftAvatar={<Avatar src={object.avatar} />}
      />
    )
  }
});

export default Notification;