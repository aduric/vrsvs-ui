import _ from 'underscore'
import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import ChallengeList from '../components/ChallengeList'

const getCurrentUserChallanges = (challenges, profile_id) => {
    return _.filter(challenges, (c) => {
        return c.issuer == profile_id || c.participant == profile_id
    });
}

const mapStateToProps = (state, ownProps) => {
    return {
        challenges: getCurrentUserChallanges(state.challenges, ownProps.auth.getProfile().user_id)
    }
}

const VisibleChallengeList = connect(
  mapStateToProps
)(ChallengeList)

export default VisibleChallengeList