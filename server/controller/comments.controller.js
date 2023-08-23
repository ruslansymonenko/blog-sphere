import postSchema from "../database/scheme/post.schema.js";
import userSchema from "../database/scheme/user.schema.js";
import commentSchema from '../database/scheme/comment.schema.js';
import { getSocketIOInstance } from "../utils/socketIOInstanse.js";

export const getComments = async (req, res) => {
  try {
    const comments = await commentSchema.find({
      post: req.params.id
    });

    if(comments.length) {
      return res.json({
        comments: comments,
      });
    } else {
      return res.json({
        comments: null,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const addComment = async (req, res) => {
  try {
    const {text, postId} = req.body;
    const io = getSocketIOInstance();

    const newComment = new commentSchema({
      text: text,
      author: req.user._id,
      post: postId,
    });

    await newComment.save();
    await userSchema.findOneAndUpdate(
      {_id: req.user._id}, 
      {
      $push: {comments: newComment}
    });
    await postSchema.findOneAndUpdate(
      {_id: postId}, 
      {
      $push: {comments: newComment}
    });

    res.json({
      message: 'Your comment was added.'
    });

    io.emit('add-comment', newComment);
    
  } catch (error) {
    res.json({
      message: 'Some error, please, try later'
    })
  }
};

export const deleteComment = async (req, res) => {

};