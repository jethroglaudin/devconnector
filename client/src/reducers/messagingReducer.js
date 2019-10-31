import {
  ADD_MESSAGE,
  ADD_REPLIES,
  GET_PRIVATE_MESSAGES,
  GET_CONVERSATIONS,
  MESSAGING_LOADING,
  DELETE_CONVERSATION,
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
    case GET_PRIVATE_MESSAGES:
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
    case ADD_MESSAGE:
      return {
        ...state,
        conversations: [action.payload, ...state.conversations]
      };
    case ADD_REPLIES:
      return {
        ...state,
        replies: [action.payload, ...state.replies]
      };
    case DELETE_REPLY:
      return {
        ...state,
        replies: action.payload,
        loading: false
      };
    case DELETE_CONVERSATION:
      return {
        ...state,
        conversations: state.conversations.filter(
          convo => convo._id !== action.payload
        )
      };
    default:
        return state;
  }
}
