import mongoose from "mongoose";
const connectWithDatabase = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/swipeLeftOrRight");
    console.log("connected with the database successfully ...");
  } catch (error) {
    console.log("Error while connecting with the database: " + error.message);
  }
};

export default connectWithDatabase;
