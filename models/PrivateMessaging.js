const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PrivateMessagingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  text: {
    type: String,
    required: true
  },
  name: {
    type: String
  },

  avatar: {
    type: String
  },

  replies: [
    {
      
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },

      text: {
          type: String, 
          required: true
      },

      name: {
          type: String
      },

      avatar: {
          type: String
      }
    }
  ],
  date: {
      type: Date,
      default: Date.now
  }
});


module.exports = PrivateMessaging = mongoose.model("privateMessages", PrivateMessagingSchema)