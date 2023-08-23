import { Router } from "express";
import passport from "passport";

import { getUserPostsLikes } from "../controller/user.controller.js";

const router = Router();

router.get('/getLikes/:id', passport.authenticate('jwt', {session: false}), getUserPostsLikes);

export default router;

