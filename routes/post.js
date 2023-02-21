import Express from "express";
import { GetPosts, CreatePost, AddComment, GetComments, LikePost } from "../controllers/post.js";

const router = Express.Router();

router.get("/", GetPosts);
router.post("/", CreatePost);
router.post("/:postId/comment", AddComment);   
router.get("/:postId/comment", GetComments);         
router.get("/:postId/like", LikePost);      

export default router;