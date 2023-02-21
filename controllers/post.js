import Post from "../models/post.js";
import Comment from "../models/comment.js";

//get posts
export const GetPosts = async (req, res) => {
    try {
        const posts = await Post.find({ userId: req.query.userId }, null, {limit: 20})
        res.status(200).json(posts)
    }
    catch (err) {
        res.status(404).json({message: err.message})
    }
}

//create new post
export const CreatePost = async (req, res) => {
    const newPost = new Post(req.body)
    try {
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    }
    catch (err) {
        res.status(409).json({message: err.message});
    }
}

//add comment
export const AddComment = async (req, res) => {
    try {
        const newComment = new Comment(req.body)
        const savedComment = await newComment.save();
        res.status(201).json(savedComment);
    }
    catch (err) {
        res.status(409).json({message: err.message});
    }
}

//get comments
export const GetComments = async (req, res) => {
    try {
        const comments = await Comment.find({ postId: req.params.postId })
        res.status(200).json(comments)
    }
    catch (err) {
        res.status(404).json({message: err.message})
    }
}

//like a post
export const LikePost = async (req, res) => {
    try {
        await Post.updateOne({ postId: req.params.postId }, { $inc: { likes: 1 }})
        res.status(200)
    }
    catch (err) {
        console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', err);
        res.status(404).json({message: err.message})
    }
}