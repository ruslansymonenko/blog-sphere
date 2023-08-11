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
    required: false,
    default: '',
  },
  photoSrc: {
    type: String,
    required: false,
    default: '',
  },
  posts: {
    ref: 'posts',
    type: Schema.Types.ObjectId,
  }
}, {timestamps: true});

export default mongoose.model('user', userSchema);