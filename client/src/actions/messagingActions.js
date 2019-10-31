import axios from "axios";
import {
  ADD_MESSAGE,
  GET_ERRORS,
  MESSAGING_LOADING,
  GET_CONVERSATIONS,
  GET_PRIVATE_MESSAGES,
  DELETE_CONVERSATION,
  DELETE_REPLY,
  CLEAR_CONVERSATION_ERRORS
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
        type: GET_CONVERSATIONS,
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
        type: GET_PRIVATE_MESSAGES,
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
    .delete(`/api/messaging/messages/${replyId}/${messageId}`)
    .then(res =>
      dispatch({
        type: DELETE_REPLY,
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

export const deleteConversation = id => dispatch => {
  axios.delete(`/api/messaging/messages/${id}`).then(res =>
    dispatch({
      type: DELETE_CONVERSATION,
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
export const clearConversationErrors = () => {
  return {
    type: CLEAR_CONVERSATION_ERRORS
  };
};
