"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorResponse_1 = require("../utils/errorResponse");
const successResponse_1 = require("../utils/successResponse");
const dbConnector_1 = __importDefault(require("../config/dbConnector"));
const getTodos = async (_req, res) => {
    try {
        const todos = await dbConnector_1.default.query('SELECT * FROM todos');
        let responseMessage = 'Todo tasks were fetched successfully';
        let responseData = todos.rows[0];
        console.log('todos.rowwssss >>', todos.rows);
        console.log('todos >>', todos);
        res.status(200).json((0, successResponse_1.successResponseBody)(responseMessage, responseData));
    }
    catch (error) {
        res.status(500).json((0, errorResponse_1.errorResponseBody)('Internal Server Error!'));
    }
};
exports.default = getTodos;
//# sourceMappingURL=getTodosController.js.map