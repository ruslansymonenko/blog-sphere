import { Router } from "express";
import passport from "passport";

import { getUserPostsLikes, getUserPostsViews, getUserPostsComments } from "../controller/user.controller.js";

const router = Router();

router.get('/getLikes/:id', passport.authenticate('jwt', {session: false}), getUserPostsLikes);

router.get('/getViews/:id', passport.authenticate('jwt', {session: false}), getUserPostsViews);

router.get('/getComments/:id', passport.authenticate('jwt', {session: false}), getUserPostsComments);

export default router;

