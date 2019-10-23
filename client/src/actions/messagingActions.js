import axios from "axios";
import {
  ADD_MESSAGE,
  ADD_REPLIES,
  GET_ERRORS,
  MESSAGING_LOADING,
  GET_CONVERSATIONS,
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
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// GET ALL MESSAGES/Conversations 
export const getMessages = () => dispatch => {
  dispatch(setMessageLoading());
  axios
    .get("/api/messaging")
    .then(res => {
      dispatch({
        type: GET_CONVERSATIONS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: null
      })
    );
};

// GET MESSAGE .... This will get the individual message
export const getMessage = id => dispatch => {
  dispatch(setMessageLoading());
  axios
    .get(`/api/messaging/${id}`)
    .then(res => {
      dispatch({
        type: GET_PRIVATE_MESSAGES,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// ADD REPLY
export const addReply = (messageId, replyData) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/messaging/messages/${messageId}`, replyData)
    .then(res =>
      dispatch({
        type: ADD_REPLIES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// DELETE a Reply
export const deleteReply = (messageId, replyId) => dispatch => {
  axios
    .delete(`/api/messaging/messages/${messageId}/${replyId}`)
    .then(res =>
      dispatch({
        type: DELETE_REPLY,
        payload: replyId
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const deleteConversation = id => dispatch => {
  axios.delete(`/api/messaging/${id}`).then(res =>
    dispatch({
      type: DELETE_MESSAGE,
      payload: id
    })
  )
  .catch(err => 
    dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }))
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