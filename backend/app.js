import express from "express";
import connectWithDatabase from "./src/config/database.js";
const app = express();
import User from "./src/models/user.js";
import validateSignUpData from "./src/utils/validation.js";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//middleware for checking the current logged in user and to secure the protected routes: 
import userAuth from "./src/middlewares/auth.js";
//middlewares for parsing the incoming JSON request :
app.use(express.json());

//it is used so the parse cookie attached to the client (req).
app.use(cookieParser());

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

app.post("/login", async (req, res) => {
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
      const token = jwt.sign({ id: user._id }, "swipeLeftOrRight",{
        expiresIn:"1d",
      });
      console.log(token);
      //saving the token to cookie:
      res.cookie("token", token, {
        httpOnly: true, // safer from XSS
        secure: false, // set to true in production (https)
        sameSite: "Lax", // adjust depending on frontend/backend hosting
      });
      return res.status(201).json({ message: "Logged in successfully...." });
    } else {
      return res.status(500).json({ message: "Invalid credentials.." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "error while loggin ...", error: error.message });
  }
});

app.get("/profile", userAuth,  async (req, res) => {
  try {
    const user= req.user; 
    res.send(user);
  } catch (error) {
     res
      .status(500)
      .json({ message: "error while getting profile ...", error: error.message });
  } 
});

app.post("/sendConnectionRequest", userAuth, async(req,res)=>{
  const user= req.user;
  res.send(user.firstName + " sent the connection request");
})


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



app.listen(3000, () => {
  console.log("Server is running on port 3000....");
});
