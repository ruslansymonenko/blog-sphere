import postSchema from "../database/scheme/post.schema.js";
import userSchema from "../database/scheme/user.schema.js";
import commentSchema from '../database/scheme/comment.schema.js';

export const getUserPostsLikes = async (req, res) => {
  try {
    const userPosts = await postSchema.find({author: req.user._id});

    let totalLikes = 0;

    userPosts.forEach(post => {
      totalLikes += post.likes;
    });

    res.json({
      totalLikes: totalLikes
    })
  } catch (error) {
    console.log(error);
  }
};

export const getUserPostsViews = async (req, res) => {
  try {
    const userPosts = await postSchema.find({author: req.user._id});

    let totalViews = 0;

    userPosts.forEach(post => {
      totalViews += post.views;
    });

    res.json({
      totalViews: totalViews
    })
  } catch (error) {
    console.log(error);
  }
};

export const getUserPostsComments = async (req, res) => {
  try {
    const userPosts = await postSchema.find({author: req.user._id});

    let totalComments = 0;

    userPosts.forEach(post => {
      totalComments += post.comments.length;
    });

    res.json({
      totalComments: totalComments
    })
  } catch (error) {
    console.log(error);
  }
};