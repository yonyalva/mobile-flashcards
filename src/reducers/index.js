import { RECEIVE_ENTRIES, ADD_ENTRY, DELETE_ENTRY, ADD_CARD } from "../actions";

function entries(state = {}, action) {
  switch (action.type) {
    case RECEIVE_ENTRIES:
      return {
        ...state,
        ...action.decks,
      };
    case ADD_ENTRY:
      return {
        ...state,
        [action.deck]: {
          title: action.deck,
          questions: [],
        },
      };
    case ADD_CARD:
      return {
        ...state,
        [action.deck]: {
          ...state[action.deck],
          questions: state[action.deck].questions.concat(action.card),
        },
      };
    case DELETE_ENTRY:
      const newState = Object.assign({}, state);
      delete newState[action.deck];
      return newState;
    default:
      return state;
  }
}

export default entries;
