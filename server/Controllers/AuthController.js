import userModel from "../Models/userModel.js";
import bcrypt from'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
//registering a user
export const registerUser = async (req, res) => {
    try {
        // Ensure that the request body has been properly parsed
        if (!req.body) {
            return res.status(400).json({ message: "Request body is empty" });
        }

        const salt = await bcrypt.genSalt(10); // Generate salt
        const hashedPassword = await bcrypt.hash(req.body.password, salt); // Hash the password using the generated salt
        req.body.password = hashedPassword;
        const { username } = req.body;

        const oldUser = await userModel.findOne({ username });
        if (oldUser) return res.status(400).json({ message: "Username is already registered" });

        // Create a new user with the hashed password
        const newUser = new userModel(req.body);
        // Save the new user
        const user= await newUser.save();
        const token=jwt.sign({
            username:user.username,id:user._id
        },process.env.JWT_KEY,{expiresIn:'1h'});
        // Respond with the new user data
        res.status(200).json({user,token});
    } catch (err) {
        res.status(500).json(err);
    }
}

//login user
export const loginUser=(req,res)=>{
    const {username,password}=req.body;
    const user=userModel.findOne({username:username})
    .then((user)=>{
        if(user)
        {
            bcrypt.compare(password,user.password) 
            .then((validity)=>{
                if(!validity)res.status(400).json("wrong password");
                else 
                {
                    const token=jwt.sign({
                    username:user.username,id:user._id
                    },process.env.JWT_KEY,{expiresIn:'1h'});
                    res.status(200).json({user,token});
                }
            })   
        }
        else
        {
            return res.status(404).json("user doesn't exist");
        }
        
    })
    .catch((err)=>{
        res.status(500).json(err);
    })
}