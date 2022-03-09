"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const todoRouter = express_1.default.Router();
todoRouter.get('/todos', controllers_1.getTodos);
todoRouter.post('/todos', controllers_1.createTodo);
todoRouter.put('/todos/:id', controllers_1.updateTodo);
todoRouter.delete('/todos/:id', controllers_1.deleteTodo);
todoRouter.put('/todos/complete/:id', controllers_1.completeTodo);
exports.default = todoRouter;
//# sourceMappingURL=todosRoutes.js.map