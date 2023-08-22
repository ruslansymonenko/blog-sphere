import { Router } from "express";
import passport from "passport";

import { getAllPosts, getPostById, addPost, likePost, deletePost, getMyPosts } from '../controller/posts.controller.js';

const router = Router();

router.get('/getAllPosts', getAllPosts);

router.get('/getpost/:id', getPostById);

router.get('/getMyPosts', passport.authenticate('jwt', {session: false}), getMyPosts);

router.post('/addpost', passport.authenticate('jwt', {session: false}), addPost);

router.patch('/likepost', likePost);

router.post('/deletepost', passport.authenticate('jwt', {session: false}), deletePost);

export default router;