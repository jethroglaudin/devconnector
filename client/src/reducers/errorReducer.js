import { GET_ERRORS, CLEAR_ERRORS, CLEAR_CONVERSATION_ERRORS } from '../actions/types';

const initialState = {};
  
  export default function(state = initialState, action) {
    switch (action.type) {
        case GET_ERRORS:
            return action.payload 
        case CLEAR_ERRORS:
            return {};  
        case CLEAR_CONVERSATION_ERRORS:
            return {};
      default:
        return state;
    }
  }
  