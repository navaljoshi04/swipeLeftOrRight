import express from "express";
import userAuth from "../middlewares/auth.js";
import ConnectionRequest from "../models/connectionRequest.js";

const userRouter = express.Router();

// the job of this api is to get all the pending req from the loggedin user:
userRouter.get("/user/requests/recieved", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", [
      "firstName",
      "lastName",
      "photoUrl",
      "about",
      "skills",
    ]);

    res.json({
      message: "Data fetched successfully",
      data: connectionRequest,
    });
  } catch (error) {
    req
      .statusCode(400)
      .send("error while getting pending requests" + error.message);
  }
});


userRouter.get("/user/connections",userAuth, async(req,res)=>{
  try {
    
  } catch (error) {
    
  }
})
export default userRouter;
