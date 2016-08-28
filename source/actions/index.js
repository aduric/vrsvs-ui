export const addUser = (id, name) => {
    return {
        type: 'ADD_USER',
        payload: {
            id,
            name,
            text: "",
            points: 0            
        }
    }
}

export const updateUser = (id, user) => {
    return {
        type: 'UPDATE_USER',
        payload: {
            id: id,
            user: user.name,
            text: user.text,
            points: user.points
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
