import { Router } from "express";
import passport from "passport";

import { getPosts, getPost, addPost, likePost, deletePost } from '../controller/posts.controller.js';

const router = Router();

router.get('/getposts', getPosts);

router.get('/getpost', getPost);

router.post('/addpost', passport.authenticate('jwt', {session: false}), addPost);

router.post('/likepost', likePost);

router.delete('/deletepost', deletePost);

export default router;