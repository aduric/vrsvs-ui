import React, { PropTypes } from 'react'
import {List, ListItem} from 'material-ui/List';
import Challenge from './Challenge'

const ChallengeList = ({ challenges }) => (
  <List>
    {challenges.map(challenge =>
      <Challenge
        key={challenge.id}
        {...challenge}
      />
    )}
  </List>
)

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