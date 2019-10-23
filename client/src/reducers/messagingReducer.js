import {
  ADD_MESSAGE,
  ADD_REPLIES,
  GET_PRIVATE_MESSAGE,
  GET_CONVERSATIONS,
  MESSAGING_LOADING,
  DELETE_MESSAGE,
  DELETE_REPLY
} from "../actions/types";

const initialState = {
  conversations: [],
  replies: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case MESSAGING_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PRIVATE_MESSAGE:
      return {
        ...state,
        replies: action.payload,
        loading: false
      };
    case GET_CONVERSATIONS:
      return {
        ...state,
        conversations: action.payload,
        loading: false
      };
  }
}
