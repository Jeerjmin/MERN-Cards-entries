const INITIAL_STATE = {
  cards: []
};

const deleteCard = (state, action) => {
  return { cards: state.cards.filter (card => {
        return card.id !== action.id
    }) }
}


const editCard = (state, action) => {
  let newState = state;
  let cardIndex = newState.cards.findIndex((card)=>card.id === action.id);
  newState.cards[cardIndex].name = action.value

  return {
    cards: newState.cards
    }
}



const CardMove = (state, action) => {
  const cardIndex = state.cards.findIndex((card)=>card.id === action.cardId);
  const afterIndex = state.cards.findIndex((card)=>card.id === action.afterId);

  return {cards: state.cards.map(
    (element, index) =>
      index === cardIndex

        ? state.cards[afterIndex]
        : index === afterIndex
        ? state.cards[cardIndex]
        : element

  )}
}



export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ADD_CARD':
      return {...state,
        cards: state.cards.concat({
        id: Math.random().toString(36).substring(7) ,
        name: '',
        })
      }
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
