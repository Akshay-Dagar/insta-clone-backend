import User from "../models/user.js";

//login
export const Login = async (req, res) => {
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
}

//signup
export const Signup = async (req, res) => {
    try {
        const newUser = new User(req.body)

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }
    catch (err) {
        res.status(500).json({message: "Something went wrong."})
    }
}