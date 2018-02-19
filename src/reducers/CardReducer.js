const { Map, List } = require('immutable')
import Immutable from 'immutable';

const INITIAL_STATE = Immutable.fromJS({
    cards: List([])
});

const deleteCard = (state, action) => {

    const cardIndex = state.get('cards').toJS().findIndex((card)=>card.id === action.id);
    return state.update('cards', card => card.delete( cardIndex ) )

}


const editCard = (state, action) => {

    const Cards = state.get('cards');
    const cardIndex = Cards.toJS().findIndex((card)=>card.id === action.id);
    const Card = Cards.get(cardIndex)
    const newCard = Card.set('name', action.value)
    const newCards = Cards.set(cardIndex, newCard)

    return state.set('cards', newCards)

}



const CardMove = (state, action) => {

    const Cards = state.get('cards');
    const cardIndex = Cards.toJS().findIndex((card)=>card.id === action.cardId);
    const afterIndex = Cards.toJS().findIndex((card)=>card.id === action.afterId);

    const sourceItem = Cards.get(cardIndex);

    const deleteCards = Cards.delete(cardIndex)
    const replacedCards = deleteCards.insert(afterIndex, sourceItem);


    return state.set('cards', replacedCards);
}


const addCard = (state) => {


    return state.update('cards', card => card.push(Map({
        id: Math.random().toString(36).substring(7) ,
        name: '',

    })))


}


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
    case 'ADD_CARD':
        return addCard(state)
    case 'DELETE_CARD':
        return deleteCard(state, action)
    case 'EDIT_CARD':
        return editCard(state,action)
    case 'UPDATE_CARD_POSITION':
        return CardMove(state,action)
    default:
        return state;
    }

}
