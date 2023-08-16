import { Router } from "express";
import passport from "passport";

import { getAllPosts, getPostById, addPost, likePost, deletePost } from '../controller/posts.controller.js';

const router = Router();

router.get('/getAllPosts', getAllPosts);

router.get('/getpost/:id', getPostById);

router.post('/addpost', passport.authenticate('jwt', {session: false}), addPost);

router.post('/likepost', likePost);

router.delete('/deletepost', deletePost);

export default router;