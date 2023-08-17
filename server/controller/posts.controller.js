import postSchema from "../database/scheme/post.schema.js";
import userSchema from "../database/scheme/user.schema.js";
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

    res.status(200).json({
      post: post,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
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

export const likePost = (req, res) => {

};

export const deletePost = (req, res) => {

};