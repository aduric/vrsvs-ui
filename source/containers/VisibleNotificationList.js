import _ from 'underscore'
import { connect } from 'react-redux'
import NotificationList from '../components/NotificationList'

const getCurrentNotifications = (notifications, profile_id) => {
    return _.filter(notifications, (n) => {
        return n.recepient == profile_id && n.status != "seen"
    });
}

const mapStateToProps = (state, ownProps) => {
    return {
        notifications: getCurrentNotifications(state.notifications, ownProps.auth.getProfile().user_id)
    }
}

const VisibleNotificationList = connect(
  mapStateToProps
)(NotificationList)

export default VisibleNotificationList