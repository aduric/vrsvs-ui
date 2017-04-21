import _ from 'underscore'
import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import UserList from '../components/UserList'
import FacebookUserProvider from '../util/FacebookUserProvider'

const getChallengesUsers = (users, profile_id) => {
    return _.filter(users, (u) => {
                return u.id != profile_id
            });
}

const getFBUsers = (access_token) => {
    var fb = new FacebookUserProvider(access_token);
    var friends = fb.getFriends();
    return _.map(friends, (f) => 
        {
            name: f.name
            id: 'facebook|'.concat(f.id)
        }
    );
}

const mapStateToProps = (state, ownProps) => {
    return {
        users: getChallengesUsers(state.users, ownProps.auth.getProfile().user_id),
        profileId: ownProps.auth.getProfile().user_id
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
      userExpand: (id) => dispatch(Actions.expandUser(id)),
      userCollapse: (id) => dispatch(Actions.collapseUser(id)),
  }
}

const VisibleUserList = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserList)

export default VisibleUserList