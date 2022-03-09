import express from 'express';

import {
  createTodo,
  deleteTodo,
  updateTodo,
  getTodos,
  completeTodo,
} from '../controllers';

const todoRouter = express.Router();

// @desc Fetch all todos
// @route GET /api/todos
todoRouter.get('/todos', getTodos);

// @desc create a todo
// @route POST /api/todos/create
todoRouter.post('/todos', createTodo);

// @desc update a todo
// @route PUT /api/todos/update/:id
todoRouter.put('/todos/:id', updateTodo);

// @desc delete a todo
// @route DELETE /api/todos/delete/:id
todoRouter.delete('/todos/:id', deleteTodo);

// @desc complete a todo
// @route PUT /api/todos/complete/:id
todoRouter.put('/todos/complete/:id', completeTodo);

export default todoRouter;
