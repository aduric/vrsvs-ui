import uuid from 'node-uuid';

export const acceptChallenge = (challenge) => {
    return updateChallenge(Object.assign({}, challenge, { status: "ACCEPTED" }))
}

export const rejectChallenge = (challenge) => {
    return updateChallenge(Object.assign({}, challenge, { status: "REJECTED" }))
}

export const completeChallenge = (challenge) => {
    return updateChallenge(Object.assign({}, challenge, { status: "COMPLETED" }))
}

export const failChallenge = (challenge) => {
    return updateChallenge(Object.assign({}, challenge, { status: "FAILED" }))
}

export const addUpdateChallengeResponse = (challengeid, id, responderid, response_msg, response_vid) => {
    return (dispatch, getState, getFirebase) => {
        const firebase = getFirebase()
        const firebasePath = 'challenges/' + challengeid + '/responses/'
        const firebaseInfo = {
            [id]: {
                responder: responderid,
                response_msg: response_msg,
                response_vid: response_vid,
                timestamp: Date.now()
            }
        }
        firebase
            .update(firebasePath, firebaseInfo)
            .then(() => {
                    var notification = {
                        "message" : "object.name + ' replied in ' + resource.description",
                        "object" : challenge.issuer_id,
                        "resource" : "challenges/" + challenge.id,
                        "status" : "unseen",
                        "subject" : challenge.participant_id,
                        "timestamp" : Date.now()
                    };
                    dispatch(sendNotification(notification))
                })
    }    
}

function updateChallenge(challenge) {
    return (dispatch, getState, getFirebase) => {
        const firebase = getFirebase()
        const firebasePath = 'challenges/' + challenge.id
        const firebaseInfo = {
            description: challenge.description,
            status: challenge.status
        }
        firebase
            .update(firebasePath, firebaseInfo)
            .then(() => {
                var notification_msg = "object.name + ' updated ' + resource.description"
                if(challenge.status === "ISSUED") {
                    notification_msg = "object.name + ' challenged you to ' + resource.description";
                } else if(challenge.status === "COMPLETED") {
                    notification_msg = "object.name + ' completed your challenge ' + resource.description";
                } else if(challenge.status === "FAILED") {
                    notification_msg = "object.name + ' failed your challenge ' + resource.description";
                } else if(challenge.status === "REJECTED") {
                    notification_msg = "object.name + ' failed your challenge ' + resource.description";
                }
                    var notification = {
                        "message" : notification_msg,
                        "object" : challenge.issuer_id,
                        "resource" : "challenges/" + challenge.id,
                        "status" : "unseen",
                        "subject" : challenge.participant_id,
                        "timestamp" : Date.now()
                    };
                    dispatch(sendNotification(notification))
                })
    }    
}

export function addUserFromFBProfile(profile) {
    return addOrUpdateUser({
        [profile.user_id]: {
            name: profile.name,          
            avatar: profile.picture,
            friends: profile.context.mutual_friends.data.map(f => 'facebook|'+f.id)
        }
    })
}

export const updatePoints = (user, addPoints) => {
    return addOrUpdateUser(Object.assign(
        {}, 
        user, 
        { points: user.points == 'undefined' ? addPoints : user.points + addPoints }))
}

function addOrUpdateUser(user) {
    return (dispatch, getState, getFirebase) => {
        const firebase = getFirebase()
        const firebasePath = 'users'
        var user_id = Object.keys(user)[0]
        var user_details = user[user_id]

        firebase.ref('users').once('value')
            .then(snapshot => {
                return snapshot.hasChild(user_id)})
            .then(userExists => {
                firebase.update(firebasePath, user)
                    .then(() => {
                        user_details.friends.forEach(friend => {
                            var notification = {
                                "message" : "'Your friend ' + object.name + ' joined!'",
                                "object" : user_id,
                                "resource" : "users/" + user_id,
                                "status" : "unseen",
                                "subject" : friend,
                                "timestamp" : Date.now()
                            };
                            if(!userExists) {
                                dispatch(sendNotification(notification))
                            }
                        })
                    })
            })
    }    
}

function sendNotification(notification) {
    return (dispatch, getState, getFirebase) => {
        const firebase = getFirebase()
        const firebasePath = 'notifications'
        var payload = {
            [uuid.v4()]: notification
        }
        firebase
            .update(firebasePath, payload)
    } 
}