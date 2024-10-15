const express = require("express");
const routes = express.Router();
const userRoute = require("./user.route");
const taskRoute = require("./task.route");
const chatRoute = require("./chat.route");

routes.use("/user", userRoute);
routes.use("/task", taskRoute);
routes.use("/chat", chatRoute);

module.exports = routes;
