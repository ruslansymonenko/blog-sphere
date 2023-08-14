import express from 'express';
import dotenv from 'dotenv';
import passport from 'passport';

import DBConnection from './database/db.connection.js';
import authRouter from './routes/auth.router.js';
import postsRouter from './routes/posts.route.js';

import { passportCheck } from './middleware/passportCheck.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(passport.initialize());

passportCheck(passport);

app.use('/auth', authRouter);
app.use('/posts', postsRouter);

app.listen(PORT, () => {
  console.log(`Server was started on port ${PORT} . . .`);
});

DBConnection();