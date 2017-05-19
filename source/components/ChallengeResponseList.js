import React, { PropTypes } from 'react'
import {List, ListItem} from 'material-ui/List';
import ChallengeResponse from './ChallengeResponse'
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
  { child: 'responder', root: 'users' },
  { child: 'response_vid', root: 'uploadedFiles' }
]

@firebaseConnect(({ id }) => {
  console.log(id)
  return [
  { path: '/challenges/' + id + '/responses' },
  { path: '/users' },
  { path: '/uploadedFiles' }]
})
@connect(
  ({ firebase }) => {
    var loadedChallenge = dataToJS(firebase, 'challenges');
    var loadedChallengeName = Object.keys(loadedChallenge)[0];
    return {
      responses: populatedDataToJS(firebase, 'challenges/' + loadedChallengeName + '/responses', populates)
    }
  }
)
export default class ChallengeResponseList extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    responses: PropTypes.object,
    firebase: PropTypes.object
  }
  render() {
    const { firebase, responses } = this.props;
    console.log('rendering responses');
    console.log(responses)
    const responseList = !isLoaded(responses)
      ? 'Loading'
      : isEmpty(responses)
        ? <div></div>
        : _.map(responses, (v, k) =>
          <ChallengeResponse
            key={k}
            id={k}
            {...v}
          />
        )
      return(
        <div>
          {responseList}
        </div>
      )
  }
}