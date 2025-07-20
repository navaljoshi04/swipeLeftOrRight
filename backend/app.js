import express from "express";
import connectWithDatabase from "./src/config/database.js";
const app = express();
import User from "./src/models/user.js";
//connecting with the database;
connectWithDatabase();

//hardcoded way of passing the data:
app.post("/signup", async (req, res) => {
  try {
    const user = new User({
      firstName: "dummydata",
      lastName: "dummy",
      email: "dummy@gmail.com",
      password: "dummy",
    });
    await user.save();
    res.send("user saved successfully");
  } catch (error) {
    console.log("Error while signing up"+ error.message);
    res.send(500).message(error.message);
  }
});
app.listen(3000, () => {
  console.log("Server is running on port 3000....");
});
