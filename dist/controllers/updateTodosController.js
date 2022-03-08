"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorResponse_1 = require("../utils/errorResponse");
const successResponse_1 = require("../utils/successResponse");
const dbConnector_1 = __importDefault(require("../config/dbConnector"));
const updateTodo = async (req, res) => {
    try {
        const { description } = req.body;
        const { id } = req.params;
        if (!id || !description) {
            throw new Error('Please provide the required credentials!');
        }
        await dbConnector_1.default.query('UPDATE todos SET description = $1 WHERE id = $2', [
            description,
            id,
        ]);
        let responseMessage = 'Todo task was updated successfully';
        let responseData = null;
        res.status(200).json((0, successResponse_1.successResponseBody)(responseMessage, responseData));
    }
    catch (error) {
        if (error.message === 'Please provide the required credentials!') {
            res.status(400).json((0, errorResponse_1.errorResponseBody)(error.message));
        }
        else {
            res.status(500).json((0, errorResponse_1.errorResponseBody)('Internal Server Error!'));
        }
    }
};
exports.default = updateTodo;
//# sourceMappingURL=updateTodosController.js.map