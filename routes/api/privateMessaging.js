const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Import Messaging model
const Message = require("../../models/PrivateMessaging");

// Import Profile model

const Profile = require("../../models/Profile");

// Validation
const validatePrivateMessaging = require("../../validation/privateMessaging");

// @route  GET api/messaging/test
// @desc   Test Messaging route
// @access Public

router.get("/test", (req, res) => {
  res.json({ msg: "Messaging is working" });
});

// @route GET /api/messaging/
// @desc GET messages
// @access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Message.find()
      .sort({ date: -1 })
      .then(messages => res.json(messages))
      .catch(err => res.status(404).json({ error: "No messages found" }));
  }
);

// @route GET /api/messaging/
// @desc GET message
// @access Private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Message.findById(req.params.id)
      .then(message => res.json(message))
      .catch(err =>
        res.status(404).json({ error: "No message found with provided id" })
      );
  }
);

// @route   POST /api/messaging/
// @desc    Create message
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePrivateMessaging(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // get recpeient
    let recepient = req.body.recepient;

    Profile.findOne({ handle: recepient })
      .then(profile => {
        const RecepientId = profile.id;

        const newMessage = new Message({
          user: req.user.id,
          recepient: recepient,
          recepientId: RecepientId,
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar
        });
        newMessage.save().then(message => res.json(message));
      })
      .catch(err => res.status(404).json({ error: "Username not found" }));
  }
);

// @route  POST /api/messaging/messages/:id
// @desc   Reply Messages
// @access Private

router.post(
  "/messages/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePrivateMessaging(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    // Locate the message by finding the message's ID
    Message.findById(req.params.id)
      .then(message => {
        const newMessage = {
          user: req.user.id,
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar
        };

        // Add newMessage payload into the replies array.

        message.replies.unshift(newMessage);

        // save
        message.save().then(message => res.json(message));
      })
      .catch(err =>
        res.status(404).json({ messagenotfound: "No message found" })
      );
  }
);

// @route /api/messaging/:id/:message_id
// @desc  Remove reply from message
// @access Private
router.delete(
  "/messages/:id/:message_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Message.findById(req.params.id)
      .then(message => {
        // Check to see if the reply message exists
        //  console.log(reply);
        if (
          message.replies.filter(
            reply => reply._id.toString() === req.params.message_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ messagenotfound: "This message does not exist" });
        }
        // Get the index of the comment so we can later remove it from the replies array
        const removeIndex = message.replies
          .map(item => item._id.toString())
          .indexOf(req.params.message_id);

        //Splice reply out of array
        message.replies.splice(removeIndex, 1);
        message.save().then(message => res.json(message));
      })
      .catch(err =>
        res.status(404).json({ messagenotfound: "No message found" })
      );
  }
);

// @route /api/messaging/:message_id
// @desc  Remove reply from message
// @access Private
router.delete(
  "/messages/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Message.findById(req.params.id).then(message => {
      if ((message._id.toString() === req.params.id).length === 0) {
        return res
          .status(404)
          .json({ conversationnotexist: "Conversation does not exist" });
      }
      Message.deleteOne({ _id: req.params.id}).then(
        res.status(200).json({ msg: "Successfully deleted message" })
      );
    })
    .catch(err => res.status(404).json({ messagenotfound: "No message found" }))
  }
);

module.exports = router;
