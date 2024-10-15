const express = require("express");
const task_controller = require("../controllers/task.controller");
const router = express.Router();
const { authUser } = require("../middleware/auth")

router.post("/tasks", authUser, task_controller.createTask);
router.put("/tasks/:id", authUser, task_controller.updateTask);
router.delete("/tasks/:id", authUser, task_controller.deleteTask);

module.exports = router;
