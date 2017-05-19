import React, { PropTypes } from 'react'
import {List, ListItem} from 'material-ui/List';
import Notification from './Notification'
import { fetchChallengesIfNeeded } from '../actions'
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import { connect } from 'react-redux'
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
  dataToJS,
  populatedDataToJS
} from 'react-redux-firebase'
import _ from 'underscore'

const populates = [
  { child: 'subject', root: '/users' },
  { child: 'object', root: '/users' },
  { child: 'resource', root: '' },
]

@firebaseConnect(() => {
  const profile = localStorage.getItem('profile') ? JSON.parse(localStorage.profile) : {}
  return [
  { path: '/notifications', queryParams: [ 'orderByChild=subject', 'equalTo=' + profile.user_id ] },
  { path: '/users' },
  { path: '/challenges' }]
})
@connect(
  ({ firebase }) => ({
    notifications: populatedDataToJS(firebase, 'notifications', populates)
  })
)
export default class NotificationList extends React.Component {
  static propTypes = {
    notifications: PropTypes.object,
    firebase: PropTypes.object
  }
  render() {
    const { firebase, notifications } = this.props;
    console.log('rendering notifications');
    console.log(this.props)
    const notificationsList = !isLoaded(notifications)
      ? 'Loading'
      : isEmpty(notifications)
        ? <p style={{"padding-left": "16px"}}>You have no notifications</p>
        : _.map(notifications, (v, k) =>
          <Notification
            key={k}
            id={k}
            {...v}
          />
        )
      return(
        <div>
          {notificationsList}
        </div>
      )
  }
}