import { Request, Response } from 'express';
import { errorResponseBody } from '../utils/errorResponse';
import { successResponseBody } from '../utils/successResponse';

// @ts-ignore
import pool from '../config/dbConnector';

const updateTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { description } = req.body;
    const { id } = req.params;

    if (!id || !description) {
      throw new Error('Please provide the required credentials!');
    }

    await pool.query(
      'UPDATE todos SET description = $1, updated_at = NOW() WHERE id = $2',
      [description, id]
    );

    let responseMessage = 'Todo task was updated successfully';
    let responseData: null = null;

    res.status(200).json(successResponseBody(responseMessage, responseData));
  } catch (error) {
    if (error.message === 'Please provide the required credentials!') {
      res.status(400).json(errorResponseBody(error.message));
    } else {
      res.status(500).json(errorResponseBody('Internal Server Error!'));
    }
  }
};

export default updateTodo;
