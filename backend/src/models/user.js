
import mongoose from "mongoose";


//this is the schema that you are creating :
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
    },
})

const User= mongoose.model("User",userSchema);
export default User; 