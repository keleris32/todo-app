require('dotenv').config();

// Packages
import express, { Application } from 'express';
import cors from 'cors';
import todoRouter from './routes/todosRoutes';

const app: Application = express();

app.use(cors()); // Cross-Origin-Resource-Sharing
app.use(express.json()); // Parse incoming data to JSON

// API routes
app.use('api', todoRouter); // Todos route

app.listen(process.env.PORT || 4000, (): void =>
  console.log('Connected ah successfully!')
);
