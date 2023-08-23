import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  photoSrc: {
    type: String,
    required: false,
    default: '',
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'post'
  }],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'comment',
  }],
  // postsViews: {
  //   type: Number,
  //   required: true,
  //   default: 0,
  // },
  // postsLikes: {
  //   type: Number,
  //   required: true,
  //   default: 0,
  // },
  // postsComments: {
  //   type: Number,
  //   required: true,
  //   default: 0
  // }
}, {timestamps: true});

export default mongoose.model('user', userSchema);