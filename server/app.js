import express from 'express';
import dotenv from 'dotenv';

import DBConnection from './database/db.connection.js';

import authRouter from './routes/auth.router.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use('/auth', authRouter);

app.listen(PORT, () => {
  console.log(`Server was started on port ${PORT} . . .`);
});

DBConnection();