import { Request, Response } from 'express';
import { errorResponseBody } from '../utils/errorResponse';
import { successResponseBody } from '../utils/successResponse';

// @ts-ignore
import pool from '../config/dbConnector';

const completeTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new Error('Please provide the required credential!');
    }

    let completed = true;

    await pool.query(
      'UPDATE todos SET completed = $1, updated_at = NOW() WHERE id = $2',
      [completed, id]
    );

    let responseMessage = 'Todo task was completed successfully';
    let responseData: null = null;

    res.status(200).json(successResponseBody(responseMessage, responseData));
  } catch (error) {
    if (error.message === 'Please provide the required credential!') {
      res.status(400).json(errorResponseBody(error.message));
    } else {
      res.status(500).json(errorResponseBody('Internal Server Error!'));
    }
  }
};

export default completeTodo;
