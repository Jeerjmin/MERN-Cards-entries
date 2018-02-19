export const addCard = () => ({
    type: "ADD_CARD"
});


export const deleteCard = (id) => ({
    type:"DELETE_CARD",
    id: id
});

export const deleteEntries = (id) => ({
    type: "DELETE_ENTRIES",
    id: id
});

export const editCardName = (id, value) => ({
    type: "EDIT_CARD",
    id: id,
    value: value
})

export const addEntry = (id) => ({
    type: "ADD_ENTRY",
    id: id
});


export const deleteEntry = (id) => ({
    type: "DELETE_ENTRY",
    id: id
});

export const addEntryName = (id, value) => ({
    type: "EDIT_ENTRY",
    id: id,
    value: value
})

export const updateCardPosition = (cardId, afterId) => ({
    type: "UPDATE_CARD_POSITION",
    cardId: cardId,
    afterId: afterId
})

export const updateEntryPosition = (entryId, afterId) => ({
    type: "UPDATE_ENTRY_POSITION",
    entryId: entryId,
    afterId: afterId
})

export const searchValue = (value) => ({
    type: "SEARCH",
    value: value
})
