import postSchema from "../database/scheme/post.schema.js";
import userSchema from "../database/scheme/user.schema.js";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

export const getPosts = (req, res) => {
  console.log('get all posts');
};

export const getPost = (req, res) => {

};

export const addPost = async (req, res) => {
    try {
      const { title, text } = req.body;
      const user = await userSchema.findById(req.user._id);

      if(req.files) {
        let fileName = Date.now().toString + req.files.image.name;
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

        return res.status(200).json({
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

      return res.status(200).json({
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