import express from "express";

//middleware for checking the current logged in user and to secure the protected routes:
import userAuth from "../middlewares/auth.js";
import ConnectionRequest from "../models/connectionRequest.js";
import User from "../models/user.js";
const requestRouter = express.Router();

//api to send the connection requests:
requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      //cant send the conneciton req to himself so we can handle this in schmea methods using pre :
    
      //first validation is user can only send intersted or ignored
      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ message: "invalid status type:" + status });
      }

      //second validation hum jo id bhej rha h uspe lga skte h ki wo exist bhi krti h ya nhi :
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res
          .status(404)
          .json({ message: "Invalid user id, please check it again " });
      }

      //third validation if there is a connection req from a  to b cant send again from b to a:
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (existingConnectionRequest) {
        return res
          .status(400)
          .send({ message: "Connection request already exists...." });
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });
      const data = await connectionRequest.save();
      res.json({ message: "connection request sent successfully ...", data });
    } catch (error) {
      res.status(500).json({message:"error while connecting ...", error:error.message });
    }
  }
);


requestRouter.post("/request/review/:status/:requestId",userAuth,async(req,res)=>{
  try {
    //krna kya hai hume;
    //1. logged in userid hai wo toUserid k equal hona chaye:
    //2. status interested hona chaye tbhi tum accept ya reject kroge 
    const loggedInUser= req.user;
    const {status,requestId}= req.params; 
    const allowedStatus=["accepted","rejected"];
    if(!allowedStatus.includes(status)){
      return res.status(400).json({message:"Status is not valid ....."})
    }
    //to find the user id le li and jo us user ne req bheji hogi uski id loggedin user ki id k equal hogi:
    const connectionRequest = await ConnectionRequest.findOne({
      _id:requestId,
      toUserId: loggedInUser._id,
      status:"interested"
    });
    if(!connectionRequest){
      return res.status(404).json({message:"Connection request not found ..."});
    }
    connectionRequest.status= status; 
    const data = await connectionRequest.save();
    res.json({message:"Connection request "+ status , data});
  } catch (error) {
    res.status(500).json({message:"error while accepting the request...", error:error.message });
  }
});

export default requestRouter;
