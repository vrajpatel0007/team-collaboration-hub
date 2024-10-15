const chat_service = require("../services/chat.service");

const createMessage = async (req, res) => {
  try {
    const message = await chat_service.create(req.body);
    res.status(201).json({ message: "Message sent successfully", message });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createMessage };
