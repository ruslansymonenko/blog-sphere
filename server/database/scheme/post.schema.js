import mongoose from "mongoose";

const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: false,
  },
  imageSrc: {
    type: String,
    required: false,
  },
  userName: {
    type: String,
    required: true,
  },
  views: {
    type: Number,
    required: true,
    default: 0,
  },
  likes: {
    type: Number,
    required: true,
    default: 0,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'comment'
  }],
}, {timestamps: true});

export default mongoose.model('post', postSchema);