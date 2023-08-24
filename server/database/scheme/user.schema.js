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
}, {timestamps: true});

export default mongoose.model('user', userSchema);