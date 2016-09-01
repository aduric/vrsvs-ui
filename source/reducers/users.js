import _ from 'underscore'

const users = (state = [], action) => {
  switch (action.type) {
    case 'ADD_USER':
        if(!_.findWhere(state, {
                id: action.payload.id
            })) {
            console.log('adding user');
            return [
                ...state,
                {
                    id: action.payload.id,
                    name: action.payload.name,
                    text: action.payload.text,
                    points: action.payload.points
                }
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
            {
                id: action.payload.id,
                name: action.payload.name,
                text: action.payload.text,
                points: action.payload.points
            }
        ]
    case 'UPDATE_POINTS':
    console.log("Update points");
    console.log(state);
    console.log(action.payload.id);
        let user = _.findWhere(state, {
                id: action.payload.id
            });
        console.log(user);
        user.points += action.payload.points;
        return [
            ..._.filter(state, (s) => {
                return s.id != action.payload.id
            }),
            user
        ]
    default:
        return state
    }
}

export default users