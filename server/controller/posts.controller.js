import postSchema from "../database/scheme/post.schema.js";
import userSchema from "../database/scheme/user.schema.js";
import commentsSchema from '../database/scheme/comment.schema.js';
import { getSocketIOInstance } from '../utils/socketIOInstanse.js';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

export const getAllPosts = async (req, res) => {
  try {
    const allPosts = await postSchema.find().sort('-createdAt');

    if (!allPosts) {
      return res.json({
        message: 'No posts . . .'
      })
    }

    res.status(200).json({
      message: 'Successful connection',
      posts: allPosts,
    });
  } catch (error) {
    req.status(500).json({
      message: 'Something going wrong, please try later!'
    })
  }
};

export const getMyPosts = async (req, res) => {
  try {
    const myPosts = await postSchema.find({
      author: req.user._id
    }).sort('-createdAt');

    if (!myPosts) {
      return res.json({
        message: 'No posts . . .'
      })
    }

    res.status(200).json({
      message: 'Successful connection',
      posts: myPosts,
    });
  } catch (error) {
    req.status(500).json({
      message: 'Something going wrong, please try later!'
    })
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await postSchema.findOneAndUpdate({_id: req.params.id}, {
      $inc: {views: 1},
    });
    
    if (!post) {
      return res.json({
        message: 'Cant fin this post . . .'
      })
    }

    res.json({
      post: post,
    });
  } catch (error) {
    console.error(error);
    res.json({
      message: 'Something going wrong, please try later!'
    })
  }
};

export const addPost = async (req, res) => {
    try {
      const { title, text } = req.body;
      const user = await userSchema.findById(req.user._id);

      if(req.files) {
        let fileName = Date.now().toString() + req.files.image.name;
        const __dirname = dirname(fileURLToPath(import.meta.url));

        req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName));

        const newPostWithImage = new postSchema({
          title: title,
          text: text,
          userName: user.name,
          imageSrc: fileName,
          author: req.user._id
        });

        await newPostWithImage.save();
        await userSchema.findOneAndUpdate(req.user._id, {
          $push: {posts: newPostWithImage}
        });

        return res.json({
          message: 'Post was published'
        });
      }

      const newPostWithoutImage = new postSchema({
        title: title,
        text: text,
        userName: user.name,
        imageSrc: '',
        author: req.user._id
      })

      await newPostWithoutImage.save();
      await userSchema.findOneAndUpdate(req.user._id, {
        $push: {posts: newPostWithoutImage}
      });

      return res.json({
        message: 'Post was published'
      })
    } catch (error) {
      console.log(error);
    }
};

export const likePost = async (req, res) => {
  try{
    const io = getSocketIOInstance();
    const updatedPost = await postSchema.findOneAndUpdate(
      { _id: req.body.id },
      { $inc: { likes: 1 } },
      { new: true } // Fetch the updated post
    );
    
    io.emit('like-post', updatedPost);

  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (req, res) => {
  try {
    const postToDelete = await postSchema.findOne({
      _id : req.body.id
    });

    //Find and delete data connected with post
    const IdOfCommentsToDelete = postToDelete.comments;
    const commentsToDelete = [];

    for (const commentId of IdOfCommentsToDelete) {
      const commentToDelete = await commentsSchema.findById(commentId);
      commentsToDelete.push(commentToDelete);
    }

    //Deleting comments of deleted post
    for (const comment of commentsToDelete) {
      await userSchema.findOneAndUpdate(comment.author, {
        $pull: {comments: comment._id}
      });

      await commentsSchema.findOneAndDelete({
        _id: comment._id
      })
    }

    //Deleting posts data on user db collection
    const author = await userSchema.findOneAndUpdate(postToDelete.author, {
      $pull: {posts: req.body.id}
    });

    await postSchema.findOneAndDelete({
      _id: req.body.id
    });

    res.json({
      message: 'Post was deleted.'
    })
  } catch (error) {
    res.json({
      message: 'Some error, please try later.'
    })
  };
};