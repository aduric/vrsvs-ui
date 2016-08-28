import _ from 'underscore'

const challenge = (action) => {
  switch (action.type) {
    case 'ADD_CHALLENGE':
        return {
            id: action.payload.id,
            issuer: action.payload.issuer_id,
            participant: action.payload.participant_id,
            description: action.payload.description,
            status: action.payload.status
        }
  }
}

const challenges = (state = [], action) => {
  switch (action.type) {
    case 'ADD_CHALLENGE':
        return [
            ...state,
            challenge(action)
        ];
    case 'UPDATE_CHALLENGE_STATUS':
        let challenge = _.findWhere(state, {
                id: action.payload.id
            });
        challenge.status = action.payload.status;
        return [ 
            ..._.filter(state, (s) => {
                s.id != action.payload.id
            }),
            challenge
        ];
    default:
        return state
    }
}

export default challenges