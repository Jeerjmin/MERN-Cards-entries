import Immutable from 'immutable';


const INITIAL_STATE = Immutable.fromJS({
    search: ''
});


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
    case 'SEARCH':
        return state.set('search', action.value)
    }

    return state
}
