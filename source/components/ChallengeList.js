import React, { PropTypes } from 'react'
import {List, ListItem} from 'material-ui/List';
import Challenge from './Challenge'
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
class ChallengeList extends React.Component {
  static propTypes = {
    challenges: PropTypes.object,
    firebase: PropTypes.object
  }
  render() {
    const { firebase, challenges } = this.props;
    console.log('rendering challenges');
    console.log(this.props)
    const challengeList = !isLoaded(challenges)
      ? 'Loading'
      : isEmpty(challenges)
        ? <p style={{"padding-left": "16px"}}>You have no active challenges. Challenge your friends!</p>
        : _.map(challenges, (v, k) =>
          <Challenge
            key={k}
            id={k}
            {...v}
          />
        )
      return(
        <div>
          <Subheader>Active challenges</Subheader>
          {challengeList}
          <Divider inset={true} />
        </div>
      )
  }
}

export default ChallengeList