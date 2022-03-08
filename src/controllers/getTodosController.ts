import { Request, Response } from 'express';
import { errorResponseBody } from '../utils/errorResponse';
import { successResponseBody } from '../utils/successResponse';
import { Todos } from '../types/todos';

// @ts-ignore
import pool from '../config/dbConnector';

const getTodos = async (_req: Request, res: Response): Promise<void> => {
  try {
    const todos = await pool.query('SELECT * FROM todos');

    let responseMessage = 'Todo tasks were fetched successfully';
    let responseData: Todos = todos.rows[0];

    console.log('todos.rowwssss >>', todos.rows);
    console.log('todos >>', todos);

    res.status(200).json(successResponseBody(responseMessage, responseData));
  } catch (error) {
    res.status(500).json(errorResponseBody('Internal Server Error!'));
  }
};

export default getTodos;
