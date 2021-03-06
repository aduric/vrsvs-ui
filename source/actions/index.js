import uuid from 'node-uuid';

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
                        "object" : responderid,
                        "resource" : "challenges/" + challengeid,
                        "status" : "unseen",
                        "subject" : responderid,
                        "timestamp" : Date.now()
                    };
                    dispatch(sendNotification(notification))
                })
    }    
}

export const acceptChallenge = (id) => {
    return updateChallenge(id, { status: "ACCEPTED" })
}

export const rejectChallenge = (id) => {
    return updateChallenge(id, { status: "REJECTED" })
}

export const completeChallenge = (id) => {
    return updateChallenge(id, { status: "COMPLETED" })
}

export const failChallenge = (id) => {
    return updateChallenge(id, { status: "FAILED" })
}

const updateChallenge = (id, payload) => {
    return (dispatch, getState, getFirebase) => {
        const firebase = getFirebase()
        const firebasePath = 'challenges/' + id
        firebase.ref(firebasePath).once('value')
            .then(snapshot => {
                var data = snapshot.val()
                firebase.update(firebasePath, payload)
                    .then(() => {
                        var notification_msg = "object.name + ' updated ' + resource.description"
                        if(payload.status === "ISSUED") {
                            notification_msg = "object.name + ' challenged you to ' + resource.description";
                        } else if(payload.status === "COMPLETED") {
                            notification_msg = "object.name + ' completed your challenge ' + resource.description";
                        } else if(payload.status === "FAILED") {
                            notification_msg = "object.name + ' failed your challenge ' + resource.description";
                        } else if(payload.status === "REJECTED") {
                            notification_msg = "object.name + ' failed your challenge ' + resource.description";
                        }
                        var notification = {
                            "message" : notification_msg,
                            "object" : data.issuer,
                            "resource" : "challenges/" + id,
                            "status" : "unseen",
                            "subject" : data.participant,
                            "timestamp" : Date.now()
                        };
                        dispatch(sendNotification(notification))
                    })
            })
    }    
}


export const addChallenge = (id, issuerId, participantId, description) => {
    return (dispatch, getState, getFirebase) => {
        const firebase = getFirebase()
        const firebasePath = 'challenges/'
        firebase
            .update(firebasePath, {
                [id]: {
                    issuer: issuerId,          
                    participant: participantId,
                    description: description,
                    status: "ISSUED"
                }})
            .then(() => {
                var notification = {
                    "message" : "object.name + ' challenged you to ' + resource.description",
                    "object" : issuerId,
                    "resource" : "challenges/" + id,
                    "status" : "unseen",
                    "subject" : participantId,
                    "timestamp" : Date.now()
                };
                dispatch(sendNotification(notification))
            })
            .then(() => addUserChallenges(issuerId, id))
    }    
}

const addUserChallenges = (issuerid, challengeid) => {
    return (dispatch, getState, getFirebase) => {
        const firebase = getFirebase()
        const firebasePath = 'users/' + issuerid + '/challenges/'

        firebase
            .update(firebasePath, challengeid)
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

export const updatePoints = (challengeid, userType, newPoints, updateTyping) => {
    return (dispatch, getState, getFirebase) => {
        const firebase = getFirebase()
        const firebasePath = 'challenges/' + challengeid
        firebase.ref(firebasePath).once('value')
            .then(snapshot => {
                var data = snapshot.val()
                var pointsUpdateUser = userType === 'issuer' ? data.issuer : data.participant
                firebase.update('users/' + pointsUpdateUser, {
                    points: newPoints
                })
                    .then(() => {
                        var notification_msg = "'You have earned " + pointsUpdate + " points for " + updateTyping + " ' + resource.description"
                        var notification = {
                            "message" : notification_msg,
                            "object" : pointsUpdateUser,
                            "resource" : "challenges/" + challengeid,
                            "status" : "unseen",
                            "subject" : pointsUpdateUser,
                            "timestamp" : Date.now()
                        };
                        dispatch(sendNotification(notification))
                    })
            })
    }  
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
                            if(!userExists) {
                                // send notifications
                                var notification = {
                                    "message" : "'Your friend ' + object.name + ' joined!'",
                                    "object" : user_id,
                                    "resource" : "users/" + user_id,
                                    "status" : "unseen",
                                    "subject" : friend,
                                    "timestamp" : Date.now()
                                };
                                dispatch(sendNotification(notification))
                                // add to friends
                                dispatch(addUserToFriends(friend, user_id))
                            }

                        })
                    })
            })
    }    
}

function addUserToFriends(friend, user) {
    return (dispatch, getState, getFirebase) => {
        const firebase = getFirebase()
        const firebasePath = 'users/' + friend
        
        firebase.ref(firebasePath).once('value')
            .then(snapshot => {
                return snapshot.hasChild('friends')})
            .then(friendsExists => {
                if(!friendsExists) {
                    user = {
                        friends: [user]
                    }
                }        
                firebase.update(firebasePath, [user])
            })
    } 
}

// TODO REMOVE USER FROM FB APP
export function removeUser(userid) {
    return (dispatch, getState, getFirebase) => {
        const firebase = getFirebase()
        const firebasePath = 'users'
        var removePath = 'users/' + userid
        var userRef = firebase.database().ref(removePath);
        var issuerChallengeRef = firebase.database().ref('challenges').orderByChild("issuer").equalTo(userid);
        var participantChallengeRef = firebase.database().ref('challenges').orderByChild("issuer").equalTo(userid);
        issuerChallengeRef.once('value')
            .then(function(dataSnapshot) {
                dataSnapshot.forEach(c => {
                    var removePath = 'challenges/' + c.key 
                    firebase.remove(removePath)
                })
            });
        participantChallengeRef.once('value')
            .then(function(dataSnapshot) {
                dataSnapshot.forEach(c => {
                    var removePath = 'challenges/' + c.key 
                    firebase.remove(removePath)
                })
            });
        firebase.remove(removePath)
    }    
}

export function removeChallengeResponse(cid, id) {
    return (dispatch, getState, getFirebase) => {
        const firebase = getFirebase()
        var removePath = 'challenges/' + cid + '/responses/' + id

        firebase.remove(removePath)
    }    
}

export function removeChallenge(cid) {
    return (dispatch, getState, getFirebase) => {
        const firebase = getFirebase()
        var removePath = 'challenges/' + cid

        firebase.remove(removePath)
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

export function addFeedback(id, user_id, response) {
    return (dispatch, getState, getFirebase) => {
        const firebase = getFirebase()
        const firebasePath = 'feedback'
        var payload = {
            [id]: {
                user: user_id,
                response: response
            }
        }
        firebase
            .update(firebasePath, payload)
    } 
}