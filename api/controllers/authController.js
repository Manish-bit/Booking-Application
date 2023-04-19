import User from "../models/User.js";
import bcrypt from "bcrypt";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
export const register = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      const comparePass = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (comparePass) {
        //creating a jwt token
        const token = jwt.sign(
          { id: user._id, isAdmin: user.isAdmin },
          process.env.JWT
        );
        const { password, isAdmin, ...info } = user._doc;

        //sending a jwt token as a cookie
        res
          .cookie("access_token", token, {
            httpOnly: true,
          })
          .status(200)
          .json(info);
      } else {
        return next(createError(400, "Wrong username or password"));
      }
    } else {
      return next(createError(400, "Wrong username or password"));
    }
  } catch (error) {
    next(error);
  }
};
