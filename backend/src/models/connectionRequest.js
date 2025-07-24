
import mongoose from "mongoose";

const connectionRequestSchema= new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    status:{
        type:String,
        enum:{
            values:["ignore","interested","accepted","rejected"],
        },
        required:true,
    },

},{
    timestamps:true,
});

//concept of compound index: 
connectionRequestSchema.index({fromUserId:1, toUserId:1});

//dont use arrow function as it willnot work: it is a kind of middlwares it will be called pre save.
connectionRequestSchema.pre("save",function(next){
    const connectionRequest= this; 
    //check if fromuser it is same as touserId:
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Can not send connection request to yourself ....!")
    }
    next(); 
})

const ConnectionRequest= mongoose.model("ConnectionRequest",connectionRequestSchema);
export default ConnectionRequest; 