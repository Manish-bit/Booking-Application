import User from "../models/User.js";
import bcrypt from "bcrypt";
import { createError } from "../utils/error.js";
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
        const { password, ...info } = user._doc;
        return res.status(200).json(info);
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
