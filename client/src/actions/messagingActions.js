import axios from "axios";
import {
  ADD_MESSAGE,
  GET_ERRORS,
  MESSAGING_LOADING,
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
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// GET Messages
export const getMessages = () => dispatch => {
  dispatch(se());
  axios
    .get("/api/messaging")
    .then(res => {
      dispatch({
        type: GET_PRIVATE_MESSAGES,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.responnse.data
      })
    );
};

// GET MESSAGE .... This will get the individual message
export const getMessage = id => dispatch => {
  dispatch();
};

// SET MESSAGING LOADING STATE
export const setMessageLoading = () => {
  return {
    type: MESSAGING_LOADING
  };
};

// Clear Errors
export const clearErrors = () => {
    return {
      type: CLEAR_ERRORS
    };
  };
  
