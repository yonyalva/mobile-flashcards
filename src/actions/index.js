export const RECEIVE_ENTRIES = "RECEIVE_ENTRIES";
export const ADD_ENTRY = "ADD_ENTRY";
export const DELETE_ENTRY = "DELETE_ENTRY";
export const ADD_CARD = "ADD_CARD";

export function receiveEntries(decks) {
  return {
    type: RECEIVE_ENTRIES,
    decks,
  };
}

export function addEntry(deck) {
  return {
    type: ADD_ENTRY,
    deck,
  };
}

export function deleteEntry(deck) {
  return {
    type: DELETE_ENTRY,
    deck,
  };
}

export function addCard(deck, card) {
  return {
    type: ADD_CARD,
    deck,
    card,
  };
}
