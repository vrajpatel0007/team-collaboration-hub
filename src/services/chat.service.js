const Chat = require("../models/chat.modal");

const create = async (body) => {
  return Chat.create(body);
};

module.exports = { create };
