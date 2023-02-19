import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import Post from "./models/post.js";
import User from "./models/user.js";
import Comment from "./models/comment.js";

const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
dotenv.config();

//greet
app.get(['/','/api'], async (_, res) => {
    try {
        res.send("Greetings from the backend!!!")
    }
    catch (err) {
        res.status(500).json({message: "Something went wrong."})
    }
});

//login
app.get(['/','/api/login'], async (req, res) => {
    try {
        const id = req.body.userId
        const pass = req.body.password

        const user = await User.findOne({ userId: id })
        if (user.password !== pass) {
            res.status(401).json({message: "User is not authorized to access the application (Please check your username and password)"})
        }
        res.status(200).json(user)
    }
    catch (err) {
        res.status(500).json({message: "Something went wrong."})
    }
});

//signup
app.get(['/','/api/signup'], async (req, res) => {
    try {
        const newUser = new User(req.body)

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }
    catch (err) {
        res.status(500).json({message: "Something went wrong."})
    }
});

//get newsfeed
app.get('/api/newsfeed', async (_, res) => {
    try {
        const posts = await Post.aggregate([
            { $sort: { ['likes']: -1 } },
            { $limit: Number(20) },
        ]);
        // const posts = await Post.find({}, null, {limit: 20}).sort({field: 'likes'})
        res.status(200).json(posts)
    }
    catch (err) {
        res.status(404).json({message: err.message})
    }
});

//get posts
app.get('/api/post', async (req, res) => {
    try {
        const posts = await Post.find({ userId: req.query.userId })
        res.status(200).json(posts)
    }
    catch (err) {
        res.status(404).json({message: err.message})
    }
});

//create new post
app.post('/api/post', async (req, res) => {
    const newPost = new Post(req.body)
    try {
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    }
    catch (err) {
        res.status(409).json({message: err.message});
    }
});

//add comment
app.post('/api/post/:postId/comment', async (req, res) => {
    const newComment = new Comment(req.body)
    try {
        const savedComment = await newComment.save();
        res.status(201).json(savedComment);
    }
    catch (err) {
        res.status(409).json({message: err.message});
    }
});

//get comments
app.get('/api/post/:postId/comment', async (req, res) => {
    try {
        const comments = await Comment.find({ postId: postId })
        res.status(200).json(comments)
    }
    catch (err) {
        res.status(404).json({message: err.message})
    }
});

//connect to mongo db and run server if connection successful
mongoose.connect(process.env.MONGODB_CONNECTION_URL)
    .then(() => {
        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server listening on port ${process.env.PORT}`);
        });
    }).catch(err => {
        console.log("MONGODB Connection error", err.message);
    })