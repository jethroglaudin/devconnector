const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Import Messaging model
const Messages = require("../../models/PrivateMessaging");

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
    const { errors, isValid } = validatePrivateMessaging(req.body);
    // Check validation
    if(!isValid){
      // should there be any errors return a status of 400 with the messg coming from errors object
      return res.status(400).json(errors);
    }
  }
  
);

module.exports = router;
