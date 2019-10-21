const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Import Messaging model
const Message = require("../../models/PrivateMessaging");

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

module.exports = router;
