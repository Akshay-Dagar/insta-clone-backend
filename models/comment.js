import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    createdAt: {
        type: Date,
        default: new Date()
    },
    userId: String,
    userName: String,
    text: String,
    postId: String
})

const Comment = mongoose.model('comment', commentSchema)
export default Comment