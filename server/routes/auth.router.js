import { Router } from "express";
import passport from "passport";

import { register, login, getMe } from '../controller/auth.controller.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', passport.authenticate('jwt', {session: false}), getMe);

export default router;