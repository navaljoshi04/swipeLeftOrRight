import jwt from "jsonwebtoken";
import User from "../models/user.js";
const userAuth = async (req, res, next) => {
  try {
    //read the token from the req cookies:
    const { token } = req.cookies;
    if(!token){
        throw new Error("Token is not valid .....")
    }
    //validate the token
    //find the username
    const decodeData = jwt.verify(token, "swipeLeftOrRight");
    const { id } = decodeData;
    const user = await User.findById(id);

    if (!user) {
      throw new Error("user not found ...");
    }
    req.user= user; 
    next();
  } catch (error) {
    res.status(404).send("Error"+ error.message);
  }
};

export default userAuth;
