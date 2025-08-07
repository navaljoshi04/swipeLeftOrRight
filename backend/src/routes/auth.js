import express from "express";

//yha humne authRouter ko express.Router se lia it will behave same as app
const authRouter = express.Router();

import validateSignUpData from "../utils/validation.js";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userAuth from "../middlewares/auth.js";

authRouter.post("/signup", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      gender,
      age,
      about,
      skills,
      photoUrl,
    } = req.body;

    //?this function is used to check the validation on firstname,lastname,email and password
    validateSignUpData(req);

    //? for the encryption of the password:
    const passwordHash = await bcrypt.hash(password, 10);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists .." });
    }
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      gender,
      age,
      photoUrl,
      about,
      skills,
    });
    await newUser.save();
    res
      .status(201)
      .json({ message: "user registered successfully ...", user: newUser });
  } catch (error) {
    console.error("Error while signing up:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});



authRouter.post("/login", async (req, res) => {
  try {
    //phle email aur pass daalega bnda hume use verify krna h jo humare pass h stored db m:
    const { email, password } = req.body;
    //check if user with the email exists in db:
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(500).json({ message: "Invalid credentials.." });
    }
    // ab h password ko verify krwana second task:
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const token = jwt.sign({ id: user._id }, "swipeLeftOrRight", {
        expiresIn: "1d",
      });
      console.log(token);
      //saving the token to cookie:
      res.cookie("token", token);
      return res.send(user);
      // return res.status(201).json({ message: "Logged in successfully...." });
    } else {
      return res.status(500).json({ message: "Invalid credentials.." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "error while loggin ...", error: error.message });
  }
});


authRouter.post("/logout", userAuth, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not logged in." });
    }
    res.clearCookie("token");
    return res.status(200).json({ message: "user logged out successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while loging out ...", error: error.message });
  }
});

export default authRouter;
