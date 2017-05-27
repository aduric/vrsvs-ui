import React, { PropTypes } from 'react'
import {List, ListItem} from 'material-ui/List';
import ChallengeResponse from './ChallengeResponse'
import { removeChallengeResponse } from '../actions'
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
  { child: 'responder', root: 'users' },
  { child: 'response_vid', root: 'uploadedFiles' }
]

// HACK
var currentId = null;

@firebaseConnect(({ id }) => {
  console.log(id)
  currentId = id;
  return [
  { path: '/challenges/' + id + '/responses' },
  { path: '/users' },
  { path: '/uploadedFiles' }]
})
@connect(
  ({ firebase }) => {
    return {
      responses: populatedDataToJS(firebase, 'challenges/' + currentId + '/responses', populates)
    }
  }
)
export default class ChallengeResponseList extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    responses: PropTypes.object,
    firebase: PropTypes.object
  }
  deleteResponse(id) {
    this.props.dispatch(removeChallengeResponse(currentId, id));
  }
  render() {
    const { firebase, responses } = this.props;
    console.log('rendering responses');
    console.log(responses)
    const responseList = !isLoaded(responses)
      ? <LinearProgress mode="indeterminate" />
      : isEmpty(responses)
        ? <div></div>
        : _.map(responses, (v, k) =>
          <ChallengeResponse
            handleDelete={() => this.deleteResponse(k)}
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