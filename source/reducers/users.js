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
                    avatar: action.payload.avatar,
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
                avatar: action.payload.avatar,
                points: action.payload.points
            }
        ]
    case 'RECEIVE_USERS':
        console.log('receive users reducer')
        console.log(action.payload.users)
        var mappedusers = _.map(action.payload.users, function(u) { 
                return {
                    name: u.name,
                    id: 'facebook|'.concat(u.id),
                    avatar: u.picture.data.url,
                    points: 0
                }});
        console.log(mappedusers)
        var s = _.uniq([...state, ...mappedusers], function(item, key, id) {
                return item.id;
            }
        )
        console.log('new state')
        console.log(s)
        return s;
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