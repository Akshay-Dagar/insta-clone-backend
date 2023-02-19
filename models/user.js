import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    createdAt: {
        type: Date,
        default: new Date()
    },
    profileImage: String,
    name: String,
    userId: String,
    password: String
})

const User = mongoose.model('user', userSchema)
export default User