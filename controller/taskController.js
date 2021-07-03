const Task = require("../models/Task");

exports.getTask = async (req, res) => {
  try {
    const task = await Task.findOne({ userID: req.user.id });
    res.json({ task: task });
  } catch (error) {
    console.log(error.message);
  }
};

exports.createTask = async (req, res) => {
  const { title, description } = req.body;
  try {
    var Obj = {
      userID: req.user.id,
      title: title,
      description: description,
    };
    var task = await new Task(Obj);
    await task.save();
    return res.json({ statusCode: 200, msg: "Task Created", task: task });
  } catch (error) {
    console.log(error.message);
  }
};

exports.updateTask = async (req, res) => {
  const { title, description } = req.body;
  try {
    var Obj = {
      title: title,
      description: description,
    };
    var task = await Task.findById(req.params.id);
    if (task) {
      var task = await Task.findOneAndUpdate({
        _id: req.params.id,
        $set: Obj,
        new: true,
      });
      return res.json({ msg: "Task Updated", task: task });
    }
    return res.json({ msg: "Enter valid ID!" });
  } catch (error) {
    console.log(error.message);
  }
};

exports.deleteTask = async (req, res) => {
  try {
    var task = await Task.findById(req.params.id);
    if (task) {
      var task = await Task.findOneAndDelete({
        _id: req.params.id,
      });
      return res.json({ msg: "Task Deleted" });
    }
    return res.json({ msg: "Enter valid ID!" });
  } catch (error) {
    console.log(error.message);
  }
};
