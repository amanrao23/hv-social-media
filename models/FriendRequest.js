const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const friendRequestModel = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    recipient: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    status: {
      type: String,
      required: true,
      default:"pending"
    },
    date:{
        type:Date,
        default:Date.now()
    }
  }
);

module.exports = mongoose.model('FriendRequest', friendRequestModel);