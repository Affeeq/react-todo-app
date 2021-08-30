const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  expiresOn: {
    type: Date,
    required: true,
  },
  status: {
      type: String,
      required: true,
  },
  attachment: {
      type: String,
      required: false,
  }
});

module.exports = mongoose.model("Todo", todoSchema);