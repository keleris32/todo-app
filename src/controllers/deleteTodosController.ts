import { Request, Response } from 'express';
import { errorResponseBody } from '../utils/errorResponse';
import { successResponseBody } from '../utils/successResponse';

// @ts-ignore
import pool from '../config/dbConnector';

const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.body.id;

    if (!id) {
      throw new Error('Please provide required credential!');
    }

    await pool.query('DELETE FROM todos WHERE id = $1', [id]);

    let responseMessage = 'Todo task was deleted successfully';
    let responseData: object = {};

    res.status(200).json(successResponseBody(responseMessage, responseData));
  } catch (error) {
    if (error.message === 'Please provide required credential!') {
      res.status(400).json(errorResponseBody(error.message));
    } else {
      res.status(500).json(errorResponseBody('Internal Server Error!'));
    }
  }
};

export default deleteTodo;
