import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        username:{
            type: String,
            required: true
        },
        password:{
            type: String,
            required: true
        },
        role:{
            type: String,
            required: true,
            enum: ['admin', 'user']
        }
    },
    {
        timestamp: true
    }
)

const userModel = mongoose.model("PollUser", userSchema)

export default userModel