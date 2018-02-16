const INITIAL_STATE = {
  entries: []
};

const addEntry = (state, action) => {

  return {...state,
    entries: state.entries.concat({
    idEntry: Math.random().toString(36).substring(7) ,
    idCard: action.id,
    name: '',
    })
  }
}

const editEntry = (state, action) => {

  let newState = state;
  let entryIndex = newState.entries.findIndex((entry)=>entry.idEntry == action.id);
  newState.entries[entryIndex].name = action.value

  return {
    entries: newState.entries
    }
}

const deleteEntry = (state,action) => {
  return {...state,
        entries: state.entries.filter (entry => {
        return entry.idEntry !== action.id
    }) }
}

const deleteEntries = (state,action) => {
  return {...state,
        entries: state.entries.filter (entry => {
        return entry.idCard !== action.id
    }) }
}


const EntryMove = (state, action) =>
{
const entryIndex = state.entries.findIndex((entry)=>entry.idEntry === action.entryId);
const afterIndex = state.entries.findIndex((entry)=>entry.idEntry === action.afterId);

  return {entries: state.entries.map(
    (element, index) =>
      index === entryIndex

        ? state.entries[afterIndex]
        : index === afterIndex
        ? state.entries[entryIndex]
        : element

  )}
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
