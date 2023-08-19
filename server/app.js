import express from 'express';
import dotenv from 'dotenv';
import passport from 'passport';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import { Server } from 'socket.io';
import { initializeSocketIO } from './utils/socketIOInstanse.js';


import DBConnection from './database/db.connection.js';
import authRouter from './routes/auth.router.js';
import postsRouter from './routes/posts.route.js';

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

const httpServer = app.listen(PORT, () => {
  console.log(`Server was started on port ${PORT} . . .`);
});

DBConnection();
initializeSocketIO(httpServer);

