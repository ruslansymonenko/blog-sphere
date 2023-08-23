import { Router } from "express";
import passport from "passport";

import { getComments, addComment, deleteComment } from '../controller/comments.controller.js';

const router = Router();

router.get('/getComments/:id', getComments);

router.post('/addComment', passport.authenticate('jwt', {session: false}), addComment);

router.post('/deleteComment', deleteComment);

export default router;