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
    required: true,
  },
  views: {
    type: Number,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  user: {
    ref: 'users',
    type: Schema.Types.ObjectId
  },
}, {timestamps: true});

export default mongoose.model('post', postSchema);