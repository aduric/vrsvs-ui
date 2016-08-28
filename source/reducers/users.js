import _ from 'underscore'

const user = (action) => {
    return {
        id: action.payload.id,
        name: action.payload.name,
        text: action.payload.text,
        points: action.payload.points
    }
}

const users = (state = [], action) => {
  switch (action.type) {
    case 'ADD_USER':
        if(!_.findWhere(state, {
                id: action.payload.id
            })) {
            console.log('adding user');
            return [
                ...state,
                user(action)
            ]
        } else {
            console.log('userexist');
            return state
        }
    case 'UPDATE_USER':
        return [
            ..._.filter(state, (s) => {
                s.id != action.payload.id
            }),
            user(action)
        ]
    case 'UPDATE_POINTS':
        let user = _.findWhere(state, {
                id: action.payload.id
            });
        user.points += action.payload.points;
        return [
            ..._.filter(state, (s) => {
                s.id != action.payload.id
            }),
            user
        ]
    default:
        return state
    }
}

export default users