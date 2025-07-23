import express from "express";
//middleware for checking the current logged in user and to secure the protected routes: 
import userAuth from "../middlewares/auth.js";
const profileRouter = express.Router();

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "error while getting profile ...",
        error: error.message,
      });
  }
});

export default profileRouter;
