const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const TaskController = require("../controller/taskController");

router.get("/all", auth, TaskController.getTask);
router.post("/createTask", auth, TaskController.createTask);
router.put("/updateTask/:id", auth, TaskController.updateTask);
router.delete("/deleteTask/:id", auth, TaskController.deleteTask);

module.exports = router;
