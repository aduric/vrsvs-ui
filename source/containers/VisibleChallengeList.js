import _ from 'underscore'
import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import ChallengeList from '../components/ChallengeList'

const getCurrentUserChallanges = (challenges, users, profile_id) => {
    var aggChallenges = _.map(challenges, function(c) {
        return {
            ...c,
            "issuer_details": {
                 ..._.findWhere(users, {id: c.issuer})
            }
        }
    });
    var myChallenges = _.filter(aggChallenges, (c) => {
            return c.issuer == profile_id || c.participant == profile_id
        });
    return myChallenges;
}

const mapStateToProps = (state, ownProps) => {
    return {
        challenges: getCurrentUserChallanges(state.challenges, state.users, ownProps.auth.getProfile().user_id)
    }
}

const VisibleChallengeList = connect(
  mapStateToProps
)(ChallengeList)

export default VisibleChallengeList