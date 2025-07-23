import express from "express";
//middleware for checking the current logged in user and to secure the protected routes:
import userAuth from "../middlewares/auth.js";
import { validateEditProfile } from "../utils/validation.js";
const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(500).json({
      message: "error while getting profile ...",
      error: error.message,
    });
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfile(req)) {
      throw new Error("Invalid edit request");
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();
    res
      .status(201)
      .json({
        message: `${loggedInUser.firstName}, your profile updated successfully ....`,
        data: loggedInUser,
      });
  } catch (error) {
    res
      .status(402)
      .json({ message: "Unable to edit the profile", error: error.message });
  }
});

export default profileRouter;
