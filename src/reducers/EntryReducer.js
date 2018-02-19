const { Map, List } = require('immutable')
import Immutable from 'immutable';

const INITIAL_STATE = Immutable.fromJS({
    entries: List([])
});

const addEntry = (state, action) => {


    return state.update('entries', entry => entry.push(Map({
        idEntry: Math.random().toString(36).substring(7) ,
        idCard: action.id,
        name: '',

    })))
}

const editEntry = (state, action) => {


    const Entries = state.get('entries');
    const entryIndex = Entries.toJS().findIndex((entry)=>entry.idEntry === action.id);
    const Entry = Entries.get(entryIndex)
    const newEntry = Entry.set('name', action.value)
    const newEntries = Entries.set(entryIndex, newEntry)

    return state.set('entries', newEntries)


}

const deleteEntry = (state,action) => {

    const entryIndex = state.get('entries').toJS().findIndex((entry)=>entry.idEntry === action.id);
    return state.update('entries', entry => entry.delete( entryIndex ) )

}

const deleteEntries = (state,action) => {

    const Entries = state.get('entries');
    const filteredEntries = Entries.filter( entry => entry.get('idCard') != action.id)

    return state.set('entries', filteredEntries)

}


const EntryMove = (state, action) => {

    const Entries = state.get('entries');
    const entryIndex = Entries.toJS().findIndex((entry)=>entry.idEntry === action.entryId);
    const afterIndex = Entries.toJS().findIndex((entry)=>entry.idEntry === action.afterId);

    const sourceItem = Entries.get(entryIndex);

    const deleteEntries = Entries.delete(entryIndex)
    const replacedEntries = deleteEntries.insert(afterIndex, sourceItem);


    return state.set('entries', replacedEntries);

}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
    case 'ADD_ENTRY':
        return addEntry(state,action)
    case 'DELETE_ENTRIES':
        return deleteEntries(state,action)
    case 'DELETE_ENTRY':
        return deleteEntry(state,action)
    case 'EDIT_ENTRY':
        return editEntry(state,action)
    case 'UPDATE_ENTRY_POSITION':
        return EntryMove(state,action)
    }
    return state
}
