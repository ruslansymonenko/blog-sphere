import express from 'express';
import dotenv from 'dotenv';
import passport from 'passport';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import { initializeSocketIO } from './utils/socketIOInstanse.js';

import DBConnection from './database/db.connection.js';

import authRouter from './routes/auth.router.js';
import postsRouter from './routes/posts.router.js';
import commentsRouter from './routes/comments.router.js';

import { passportCheck } from './middleware/passportCheck.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

//Middlewares
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use(fileUpload());
app.use(express.static('uploads'));

passportCheck(passport);

//Routes
app.use('/auth', authRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);

const httpServer = app.listen(PORT, () => {
  console.log(`Server was started on port ${PORT} . . .`);
});

DBConnection();
initializeSocketIO(httpServer);

