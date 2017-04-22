
export const addUser = (id, name, avatar) => {
    return {
        type: 'ADD_USER',
        payload: {
            id,
            name,
            avatar
        }
    }
}

export const updateUser = (id, user) => {
    return {
        type: 'UPDATE_USER',
        payload: {
            id: id,
            user: user.name,
            avatar: user.avatar,
        }
    }
}

export const updatePoints = (userId, points) => {
    return {
        type: 'UPDATE_POINTS',
        payload: {
            id: userId,
            points,
        }
    }
}

export const addChallenge = (challenge_id, issuer_id, participant_id, description) => {
    return {
        type: 'ADD_CHALLENGE',
        payload: {
            id: challenge_id,
            issuer_id,
            participant_id,
            description,
            status: "ISSUED"            
        }
    }
}

export const acceptChallenge = (challenge_id) => {
    return {
        type: 'UPDATE_CHALLENGE_STATUS',
        payload: {
            id: challenge_id,
            status: "ACCEPTED"            
        }
    }
}

export const rejectChallenge = (challenge_id) => {
    return {
        type: 'UPDATE_CHALLENGE_STATUS',
        payload: {
            id: challenge_id,
            status: "REJECTED"
        }
    }
}

export const completeChallenge = (challenge_id) => {
    return {
        type: 'UPDATE_CHALLENGE_STATUS',
        payload: {
            id: challenge_id,
            status: "COMPLETED"
        }
    }
}

export const failChallenge = (challenge_id) => {
    return {
        type: 'UPDATE_CHALLENGE_STATUS',
        payload: {
            id: challenge_id,
            status: "FAILED"
        }
    }
}

function shouldFetchUsers(state, fbProvider) {}
function fetchUsers(fbProvider) {
    return dispatch => {
        dispatch(requestUsers())
        return fbProvider.api('me/friends?fields=id,name,picture', function(res) {
            var users = []
            if(!res || res.error) {
                console.log(!res ? 'error occurred' : res.error);
            } else {
                console.log('got friends')
                console.log(res)
                users = res.data
            }
            dispatch(receiveUsers(users));
        });
    }
}
function receiveUsers(users) {
    console.log('receive users')
    console.log(users)
    return {
        type: 'RECEIVE_USERS',
        payload: {
            users: users
        }
    }
}
function requestUsers() {
        console.log('REQUEST_USERS')
    return {
        type: 'REQUEST_USERS'
    }
}
export function fetchUsersIfNeeded(fbProvider) {
    return (dispatch, getState) => {
        return dispatch(fetchUsers(fbProvider))
    }    
}
export function fetchPoints(fbase, userId) {
    return (dispatch, getState) => {
        return fbase.database().ref('users/' + userId + '/points').once('value', function(snapshot) {
            var points = snapshot.val();
            console.log('data from firebase - points')
            console.log(points)
            dispatch(updatePoints(userId, points));
        }, function(error) {
            // The callback failed.
            console.error(error);
        });
    }
}
function fetchNotifications(fbase, userId) {
    console.log('data from firebase top')
    console.log(fbase)
    return dispatch => {
        return fbase.database().ref('users/' + userId + '/notifications').once('value', function(snapshot) {
            var notifications = snapshot.val();
            console.log('data from firebase')
            console.log(notifications)
            dispatch(receiveNotifications(notifications));
        }, function(error) {
            // The callback failed.
            console.error(error);
        });
    }
}
function receiveNotifications(notifications) {
    console.log('receive notifications')
    console.log(notifications)
    return {
        type: 'RECEIVE_USER_NOTIFICATIONS',
        payload: {
            notifications: notifications
        }
    }
}

function fetchChallenges(fbase, userId) {
    console.log('data from firebase top')
    console.log(fbase)
    return dispatch => {
        return fbase.database().ref('challenges').once('value', function(snapshot) {
            var challenges = snapshot.val();
            console.log('data from firebase')
            console.log(challenges)
            dispatch(receiveChallenges(challenges));
        }, function(error) {
            // The callback failed.
            console.error(error);
        });
    }
}
function receiveChallenges(challenges) {
    console.log('receive notifications')
    console.log(challenges)
    return {
        type: 'RECEIVE_CHALLENGES',
        payload: {
            challenges: challenges
        }
    }
}

function updateSeenNotifications(fbase, userId) {
    return dispatch => {
        return fbase.database().ref('users/' + userId + '/notifications').once('value', function(snapshot) {
            var updates = {};
            snapshot.forEach(function(child) {
                updates[child.key + '/status'] = "seen";
            });
            fbase.database().ref('users/' + userId + '/notifications').update(updates);
            dispatch(receiveNotifications([]));
        }, function(error) {
            // The callback failed.
            console.error(error);
        });
    }
}

export function fetchNotificationsIfNeeded(fbase, userId) {
    return (dispatch, getState) => {
        return dispatch(fetchNotifications(fbase, userId))
    }    
}

export function fetchChallengesIfNeeded(fbase, userId) {
    return (dispatch, getState) => {
        return dispatch(fetchChallenges(fbase, userId))
    }    
}

export function handleSeen(fbase, userId) {
    return (dispatch, getState) => {
        return dispatch(updateSeenNotifications(fbase, userId))
    }    
}