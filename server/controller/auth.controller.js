import jwttoken from 'jsonwebtoken';

import userSchema from "../database/scheme/user.schema.js";
import { hidePassword, checkPassword } from "../helpers/cryptUserPassword.js";

export const register = async (req, res) => {
  const isUser = await userSchema.findOne({email: req.body.email});

  const hashPassword = await hidePassword(req.body.password);
  
  if(!isUser) {
    try {
      const user = new userSchema({
        email: req.body.email,
        password: hashPassword,
        name: req.body.email,
      });

      await user.save();

      const token = jwttoken.sign({
        userId: user._id
      },
      process.env.JWT_SECRET,
      {expiresIn: '10d'}
      );

      console.log('User created');
      res.status(200).json({
        message: "User successfully registered",
        user,
        token: `Bearer ${token}`
      });

    } catch (err) {
      console.log('error');
      res.status(209).json({
        message: err.message,
      });
    }
  } else {
    res.status(409).json({
      message: "This user has already registered"
    })
  }
}

export const login = async (req, res) => {
  const isUser = await userSchema.findOne({email: req.body.email});

  if(isUser) {
    const isPassword = await checkPassword(req.body.password, isUser.password); 

    if(isPassword) {
      const token = jwttoken.sign({
        userId: isUser._id
      },
      process.env.JWT_SECRET,
      {expiresIn: '10d'}
      );

      res.status(200).json({
        token: `Bearer ${token}`
      });
    } else {
      res.status(401).json({
        message: "Wrong password"
      });
    }
  } else {
    res.status(404).json({
      message: "This user is not registered"
    });
  }
}