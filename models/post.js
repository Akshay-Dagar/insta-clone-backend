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
    likes: {
        type: Number,
        default: 0
    }
})

const Post = mongoose.model('Post', postSchema)
export default Post