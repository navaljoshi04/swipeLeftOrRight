import express from "express";
import connectWithDatabase from "./src/config/database.js";
const app = express();
import User from "./src/models/user.js";

//middlewares for parsing the incoming JSON request :
app.use(express.json());
//connecting with the database;
connectWithDatabase();

//! hardcoded way of passing the data (using the instance of model):
// app.post("/signup", async (req, res) => {
//   try {
//     const user = new User({
//       firstName: "dummydata",
//       lastName: "dummy",
//       email: "dummy@gmail.com",
//       password: "dummy",
//     });
//     await user.save();
//     res.send("user saved successfully");
//   } catch (error) {
//     console.log("Error while signing up"+ error.message);
//     res.send(500).message(error.message);
//   }
// });

//! this is how you do it in real wordl:
app.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists .." });
    }
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
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

//! get user by email:
app.get("/user", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "server error", error: error.message });
  }
});

//! to delete the user :
app.delete("/user", async (req, res) => {
  try {
    const { userID } = req.body;
    const user = await User.findByIdAndDelete( userID );
    res.status(200).send("user deleted successfully ");
  } catch (error) {
    res.status(500).json({message:"error while deleting", error:error.message});
  }
});

//! to update the user: 
app.patch("/user",async(req,res)=>{
  try {
    const userID= req.body.userID;
    const data= req.body;
    await User.findByIdAndUpdate({_id:userID}, data);
    res.send("user upated successfully");
  } catch (error) {
    res.status(500).json({message:"error while updating", error:error.message})
  }
})
//!this is to see all the registered user;
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(400).send("error while getting users" + error.message);
  }
});
app.listen(3000, () => {
  console.log("Server is running on port 3000....");
});
