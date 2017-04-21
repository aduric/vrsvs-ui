import _ from 'underscore'

const notifications = (state = [], action) => {
  switch (action.type) {
    case 'RECEIVE_USER_NOTIFICATIONS':
        console.log('notif reducer')
        return action.payload.notifications
    default:
        return state
    }
}

export default notifications