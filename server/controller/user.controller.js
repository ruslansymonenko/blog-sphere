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