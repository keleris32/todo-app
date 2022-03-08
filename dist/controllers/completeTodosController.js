"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorResponse_1 = require("../utils/errorResponse");
const successResponse_1 = require("../utils/successResponse");
const dbConnector_1 = __importDefault(require("../config/dbConnector"));
const completeTodo = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            throw new Error('Please provide the required credential!');
        }
        let completed = true;
        await dbConnector_1.default.query('UPDATE todos SET completed = $1 WHERE id = $2', [
            completed,
            id,
        ]);
        let responseMessage = 'Todo task was completed successfully';
        let responseData = null;
        res.status(200).json((0, successResponse_1.successResponseBody)(responseMessage, responseData));
    }
    catch (error) {
        if (error.message === 'Please provide the required credential!') {
            res.status(400).json((0, errorResponse_1.errorResponseBody)(error.message));
        }
        else {
            res.status(500).json((0, errorResponse_1.errorResponseBody)('Internal Server Error!'));
        }
    }
};
exports.default = completeTodo;
//# sourceMappingURL=completeTodosController.js.map