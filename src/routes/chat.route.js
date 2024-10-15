const express = require("express");
const chat_controller = require("../controllers/chat.controller");
const router = express.Router();

router.post("/chat", chat_controller.createMessage);

module.exports = router;
