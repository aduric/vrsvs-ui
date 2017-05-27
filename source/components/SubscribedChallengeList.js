import React, { PropTypes } from 'react'
import {List, ListItem} from 'material-ui/List';
import MyChallenge from './MyChallenge'
import { removeChallenge } from '../actions'
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import { connect } from 'react-redux'
import LinearProgress from 'material-ui/LinearProgress';
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
  dataToJS,
  populatedDataToJS
} from 'react-redux-firebase'
import _ from 'underscore'

const populates = [
  { child: 'issuer', root: 'users' },
  { child: 'participant', root: 'users' }
]

@firebaseConnect(() => {
  const profile = localStorage.getItem('profile') ? JSON.parse(localStorage.profile) : {}
  return [
  { path: '/challenges', queryParams: [ 'orderByChild=issuer', 'equalTo=' + profile.user_id ], populates },
  { path: '/users' }]
})
@connect(
  ({ firebase }) => ({
    challenges: populatedDataToJS(firebase, '/challenges', populates)
  })
)
class SubscribedChallengeList extends React.Component {
  static propTypes = {
    challenges: PropTypes.object,
    firebase: PropTypes.object
  }
  deleteChallenge(cid) {
    this.props.dispatch(removeChallenge(cid));
  }
  render() {
    const { firebase, challenges } = this.props;
    console.log('rendering challenges');
    console.log(this.props)
    const challengeList = !isLoaded(challenges)
      ? <LinearProgress mode="indeterminate" />
      : isEmpty(challenges)
        ? <Subheader style={{'font-family': 'Roboto'}}>You have no active challenges. Challenge your friends!</Subheader>
        : _.map(challenges, (v, k) =>
          <MyChallenge
            deleteChallenge={() => this.deleteChallenge(k)}
            key={k}
            id={k}
            {...v}
          />
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