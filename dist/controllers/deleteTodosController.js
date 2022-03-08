"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorResponse_1 = require("../utils/errorResponse");
const successResponse_1 = require("../utils/successResponse");
const dbConnector_1 = __importDefault(require("../config/dbConnector"));
const deleteTodo = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            throw new Error('Please provide required credential!');
        }
        await dbConnector_1.default.query('DELETE FROM todos WHERE id = $1', [id]);
        let responseMessage = 'Todo task was deleted successfully';
        let responseData = null;
        res.status(200).json((0, successResponse_1.successResponseBody)(responseMessage, responseData));
    }
    catch (error) {
        if (error.message === 'Please provide required credential!') {
            res.status(400).json((0, errorResponse_1.errorResponseBody)(error.message));
        }
        else {
            res.status(500).json((0, errorResponse_1.errorResponseBody)('Internal Server Error!'));
        }
    }
};
exports.default = deleteTodo;
//# sourceMappingURL=deleteTodosController.js.map