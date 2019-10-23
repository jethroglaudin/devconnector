import axios from "axios";
import {
  ADD_MESSAGE,
  GET_ERRORS,
  GET_PRIVATE_MESSAGE,
  GET_PRIVATE_MESSAGES,
  DELETE_MESSAGE,
  DELETE_REPLY
} from "./types";
import { clearErrors } from "./postActions";

// Add Message / Start Conversation
export const addMessage = messageData => dispatch => {
  dispatch(clearErrors());
  axios
    .post("/api/messaging", messageData)
    .then(res =>
      dispatch({
        type: ADD_MESSAGE,
        payload: res.data
      })
    )
    .catch(err => dispatch({ GET_ERRORS, payload: err.response.data }));
};
