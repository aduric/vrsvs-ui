import React, { PropTypes } from 'react'
import {List, ListItem} from 'material-ui/List';
import Challenge from './Challenge'
import { fetchChallengesIfNeeded } from '../actions'

class ChallengeList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        challenges: []
    };
  }
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchChallengesIfNeeded(this.props.fbase, this.props.auth.getProfile().user_id))
  }
  render() {
    console.log('rendering challenges');
    console.log(this.props)
    return(
      <List>
        {this.props.challenges.map(challenge =>
          <Challenge
            {...challenge}
          />
        )}
      </List>
    )
  }
}
ChallengeList.propTypes = {
  challenges: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    issuer: PropTypes.string.isRequired,
    participant: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired
  }).isRequired).isRequired,
}

export default ChallengeList