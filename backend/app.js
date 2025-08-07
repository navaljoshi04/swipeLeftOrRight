import express from "express";
import connectWithDatabase from "./src/config/database.js";
const app = express();
import cookieParser from "cookie-parser";
import cors from "cors";

//cors middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
//middlewares for parsing the incoming JSON request :
app.use(express.json());

//it is used so the parse cookie attached to the client (req).
app.use(cookieParser());

//now will import the routers that we have created till now (these help in implying separation of concerns)
import authRouter from "./src/routes/auth.js";
import profileRouter from "./src/routes/profile.js";
import requestRouter from "./src/routes/request.js";
import userRouter from "./src/routes/user.js";

//now we can use the routes now like this :
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

//connecting with the database;
connectWithDatabase();

app.listen(3000, () => {
  console.log("Server is running on port 3000....");
});

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
//! these below were for tesing purpose only:
//! get user by email:
// app.get("/user", async (req, res) => {
//   try {
//     const { email } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ message: "server error", error: error.message });
//   }
// });

//! to delete the user :
// app.delete("/user", async (req, res) => {
//   try {
//     const { userID } = req.body;
//     const user = await User.findByIdAndDelete(userID);
//     res.status(200).send("user deleted successfully ");
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "error while deleting", error: error.message });
//   }
// });

//! to update the user:
// app.patch("/user/:userID", async (req, res) => {
//   const userID = req.params.userID;
//   const data = req.body;
//   try {
//     const allowedFieldsInUpdate = [
//       "firstName",
//       "lastName",
//       "photoUrl",
//       "skills",
//       "age",
//       "about",
//     ];
//     //validation for the email:
//     const isUpdateAllowed = Object.keys(req.body).every((k) =>
//       allowedFieldsInUpdate.includes(k)
//     );
//     if (!isUpdateAllowed) {
//       return res.status(400).json({ message: "updates are not allowed" });
//     }
//     //validation for skills length:
//     const { skills } = req.body;
//     const lengthOfSkills = skills.length;
//     if (lengthOfSkills > 6) {
//       return res
//         .status(401)
//         .json({ message: "length of skills should be less than 6" });
//     }
//     await User.findByIdAndUpdate({ _id: userID }, data, {
//       runValidators: true,
//     });
//     res.send("user upated successfully");
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "error while updating", error: error.message });
//   }
// });

//!this is to see all the registered user;
// app.get("/feed", async (req, res) => {
//   try {
//     const users = await User.find({});
//     res.send(users);
//   } catch (error) {
//     res.status(400).send("error while getting users" + error.message);
//   }
// });
