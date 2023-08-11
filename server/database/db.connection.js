import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const DBConnection = () => {
  const DB_LOGIN = process.env.DB_LOGIN;
  const DB_PASSWORD = process.env.DB_PASSWORD;

  const connection = async () => {
    try {
      await mongoose.connect(`mongodb+srv://${DB_LOGIN}:${DB_PASSWORD}@blog-sphere.oqehgzq.mongodb.net/?retryWrites=true&w=majority`)
        .then((result) => {
          console.log('Database connected');
        })
    } catch(error) {
      console.log(error);
    }
  }

  connection();
};

export default DBConnection;