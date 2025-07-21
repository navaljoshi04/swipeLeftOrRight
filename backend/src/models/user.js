import mongoose from "mongoose";

//this is the schema that you are creating :
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 18,
    },
    photoUrl: {
      type: String,
      default:
        "https://www.freepik.com/premium-vector/character-avatar-isolated_374939900.htm#fromView=keyword&page=1&position=20&uuid=24798477-7919-47df-ac58-75099c018c76&query=User+Profile",
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender data is not valid..");
        }
      },
    },
    about: {
      type: String,
      default: "this is the default description of user",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
