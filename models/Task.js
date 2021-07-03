const mongoose = require("mongoose");
const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now(),
    require: true,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

module.exports = Task = mongoose.model("task", TaskSchema);
