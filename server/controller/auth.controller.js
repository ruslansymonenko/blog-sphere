import jwttoken from 'jsonwebtoken';
import { ExtractJwt } from 'passport-jwt';

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
        name: req.body.name,
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
      res.json({
        message: err.message,
      });
    }
  } else {
    res.json({
      message: "This user has already registered"
    })
  }
};

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

      res.json({
        token: `Bearer ${token}`,
        message: 'You are logged in',
        user: isUser
      });
    } else {
      res.json({
        message: "Wrong password"
      });
    }
  } else {
    res.json({
      message: "This user is not registered"
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await userSchema.findById(req.user._id);

    if(!user) {
      return res.json({
        message: 'This user is not registered'
      })
    }

    const token = jwttoken.sign({
        userId: user._id
      },
      process.env.JWT_SECRET,
      {expiresIn: '10d'}
    );

    res.json({
        user,
        token: `Bearer ${token}`
    });

  } catch (error) {
    res.json({
      message: 'No access'
    })
  }
};