const getTodos = require('./get-todos');
const createTodo = require('./create-todo');
const updateTodo = require('./update-todo');
const completeTodo = require('./complete-todo');
const deleteTodo = require('./delete-todo');

module.exports = {
  paths: {
    '/todos': {
      ...getTodos,
      ...createTodo,
    },
    '/todos/{id}': {
      ...updateTodo,
      ...deleteTodo,
    },
    '/todos/complete/{id}': {
      ...completeTodo,
    },
  },
};
