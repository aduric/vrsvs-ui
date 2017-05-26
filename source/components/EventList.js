import React, { PropTypes } from 'react'
import {List, ListItem} from 'material-ui/List';
import MyChallenge from './MyChallenge'
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

@firebaseConnect(() => {
  return [
  { path: '/events' }]
})
@connect(
  ({ firebase }) => ({
    events: dataToJS(firebase, '/events')
  })
)
class EventList extends React.Component {
  static propTypes = {
    events: PropTypes.object,
    firebase: PropTypes.object
  }
  render() {
    const { firebase, events } = this.props;
    const eventList = !isLoaded(events)
      ? 'Loading'
      : isEmpty(events)
        ? <Subheader style={{'font-family': 'Roboto'}}>There are no events found.</Subheader>
        : _.map(events, (v, k) =>
          <Card>
            <CardHeader
              avatar={v.avatar}
              title={v.name}
            />
            {!_.find(profile.user_id, v.participants) ?
              <CardActions expandable={true}>
                <RaisedButton label="Join" primary={true} style={style} onTouchTap={() => this.joinEvent()} />
              </CardActions>
            : <Check style={iconStyles} color={green500}/>}
          </Card>
        )
      return(
        <div>
          {challengeList}
          <Divider inset={true} />
        </div>
      )
  }
}

export default SubscribedChallengeList