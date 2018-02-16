import {combineReducers} from 'redux';
import CardReducer from './CardReducer';
import EntryReducer from './EntryReducer';
import SearchReducer from './SearchReducer'

const rootReducer = combineReducers({
  cards: CardReducer,
  entries: EntryReducer,
  search: SearchReducer
});

export default rootReducer;
