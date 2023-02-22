import Express from "express";
import { Login, Signup } from "../controllers/auth.js";

const router = Express.Router();

router.post("/login", Login);
router.post("/signup", Signup);    

export default router;