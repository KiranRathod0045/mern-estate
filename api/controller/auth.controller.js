import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
export const signup = async (req, res, next) => {
    console.log(req.body)
    const { username, email, password } = req.body;
    const hasedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hasedPassword })
    try {
        await newUser.save();
        res.status(201).json({ msg: "User created successfully" })
    } catch (error) {
        next(error)
    }
}