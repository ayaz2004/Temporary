import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHanler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import ApiResponse from "../utils/ApiRresponse.js";

export const signup = async (req, res, next) => {
  try {
    const {
      username,
      email,
      password,
      role,
      workArea,
      vehicleNumber,
      adharNo,
    } = req.body;

    if (!username || !email || !password) {
      return next(errorHanler(400, "All fields are required"));
    }

    // Hash Password
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // Create User Object

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role || "user",
      approvedUser: role === "vendor" ? false : true,
      workArea: role === "vendor" ? workArea : undefined, // Required for vendors
      vehicleNumber: role === "vendor" ? vehicleNumber : undefined,
      adharNo: role === "vendor" ? adharNo : undefined,
    });
    if ((!workArea && role === "vendor") || (!adharNo && role === "vendor")) {
      return next(
        errorHanler(400, `work area and adhar no is required for vendors`)
      );
    }

    // Save User
    await newUser.save();

    res
      .status(201)
      .json(
        new ApiResponse(
          200,
          "Signup successful. Waiting for approval",
          newUser.username
        )
      );
  } catch (error) {
    next(errorHanler(500, error.message));
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);

  if (!email || !password || email === "" || password === "") {
    next(errorHanler(400, "All fields are required"));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHanler(404, "Invalid Credentials!"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHanler(400, "Invalid Credentials!"));
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    const { password: pass, ...rest } = validUser._doc;
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
