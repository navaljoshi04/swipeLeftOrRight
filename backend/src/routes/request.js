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
export default requestRouter;
