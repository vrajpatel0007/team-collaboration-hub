const Task = require("../models/task.modal");

const create = async (body) => {
  return Task.create(body);
};

const update = async (id, body) => {
  return Task.findByIdAndUpdate(id, body, { new: true });
};

const deleteTask = async (id) => {
  return Task.findByIdAndDelete(id);
};

module.exports = { create, update, delete: deleteTask };
