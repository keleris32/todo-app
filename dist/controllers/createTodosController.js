"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorResponse_1 = require("../utils/errorResponse");
const successResponse_1 = require("../utils/successResponse");
const dbConnector_1 = __importDefault(require("../config/dbConnector"));
const createTodo = async (req, res) => {
    try {
        const description = req.body.description;
        if (!description) {
            throw new Error('Please enter a todo!');
        }
        const todo = await dbConnector_1.default.query('INSERT INTO todos (description) VALUES ( $1 ) returning *', [description]);
        let responseMessage = 'Todo task was created successfully';
        let responseData = todo.rows[0];
        res.status(201).json((0, successResponse_1.successResponseBody)(responseMessage, responseData));
    }
    catch (error) {
        if (error.message === 'Please enter a todo!') {
            res.status(400).json((0, errorResponse_1.errorResponseBody)(error.message));
        }
        else {
            res.status(500).json((0, errorResponse_1.errorResponseBody)('Internal Server Error!'));
        }
    }
};
exports.default = createTodo;
//# sourceMappingURL=createTodosController.js.map