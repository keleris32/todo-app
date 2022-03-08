import { Request, Response } from 'express';
import { errorResponseBody } from '../utils/errorResponse';
import { successResponseBody } from '../utils/successResponse';

// @ts-ignore
import pool from '../config/dbConnector';

const createTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const description: string = req.body.description;

    if (!description) {
      throw new Error('Please enter a todo!');
    }

    const todo = await pool.query(
      'INSERT INTO todos (description) VALUES ( $1 ) returning *',
      [description]
    );

    console.log('Alll Todos', JSON.stringify(todo, null, 2));
    console.log('Todo rowss >>>', JSON.stringify(todo.rows[0], null, 2));

    let responseMessage = 'Todo task was created successfully';
    let responseData: object = todo.rows[0];

    res.status(201).json(successResponseBody(responseMessage, responseData));
  } catch (error) {
    if (error.message === 'Please enter a todo!') {
      res.status(400).json(errorResponseBody(error.message));
    } else {
      res.status(500).json(errorResponseBody('Internal Server Error!'));
    }
  }
};

export default createTodo;
