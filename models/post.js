import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    createdAt: {
        type: Date,
        default: new Date()
    },
    tags: [String],
    image: String,
    caption: String,
    userId: String,
    likes: Number
})

const Post = mongoose.model('Post', postSchema)
export default Post