import userModel from "../Models/userModel.js";
import bcrypt from'bcrypt';
import jwt from 'jsonwebtoken';

//get all users
export const getAllUsers=(req,res)=>{
    const id=req.params.id;
    userModel.find()
    .then((result)=>{
    { 
        result=result.map((user)=>{
            const{password,...otherDetails}=user._doc  //password is taken away from user
            return otherDetails;
        })  
        res.status(200).json(result);}
    })
    .catch((err)=>{
        res.status(500).json(err);
    })
}

//get a user
export const getUser=(req,res)=>{
    const id=req.params.id;
    userModel.findById(id)
    .then((result)=>{
        if(result)
        {
            const{password,...otherDetails}=result._doc  //password is taken away from user
            res.status(200).json(otherDetails);
        }
        else
        {
            res.status(404).json("user not found");
        }
    })
    .catch((err)=>{
        res.status(500).json(err);
    })
}

//update user
export const updateUser=(req,res)=>{
    const id=req.params.id;
    const {_id,currentAdminStatus, password}=req.body.user;
    console.log(req.body.user);
    if(id==_id)
        {
            if(password)
                {
                    bcrypt.genSalt(10)  //generate salt
                    .then((salt)=>{
                        return bcrypt.hash(password,salt);  //hash the password using the genrated salt
                    })
                    .then((hashedpassword)=>{
                        req.body.password=hashedpassword;
                        return userModel.findByIdAndUpdate(id,req.body.user,{new:true});
                    })
                    .then((result)=>{
                        if(result)
                            {
                                const token=jwt.sign({
                                    username:result.username,id:result._id
                                },process.env.JWT_KEY,{expiresIn:'1h'});
                                res.status(200).json({result,token});

                            }
                    })
                    .catch((err)=>{
                        res.status(500).json(err);
                    })
                }
            else
                {
                    userModel.findByIdAndUpdate(id,req.body.user,{new:true})
                    .then((result)=>{
                        if(result)
                            res.status(200).json(result);
                    })
                    .catch((err)=>{
                        res.status(500).json(err);
                    })
                }
        }
    else
        {
            res.status(403).json('Access Denied!You can only update your own profile');
        }
}

//delete user
export const deleteUser=(req,res)=>{
    const id=req.params.id;
    const {currentUserId,currentAdminStatus}=req.body;
    if(currentUserId==id || currentAdminStatus==true)
        {
            userModel.findByIdAndDelete(id)
            .then((result)=>{
                res.status(200).json("User deleted");
            })
            .catch((err)=>{
                res.status(500).json(err);
            })
        }
    else
        {
            res.status(403).json('Access Denied!You can only delete your own profile');

        }
}

//follow a user
export const followUser=async(req,res)=>{
    const id=req.params.id;
    const {_id}=req.body;
    if(_id!=id)
        {
            try
            {
                const followUser= await userModel.findById(id);
                const followingUser= await userModel.findById(_id); 
                if(!followUser.followers.includes(_id))
                    {
                        await followUser.updateOne({$push:{followers:_id}});
                        await followingUser.updateOne({$push:{followings:id}});
                        res.status(200).json("User followed");
                    }
                else
                    {
                        res.status(403).json("User already followed by you");
                    }
            }
            catch(err){
                res.status(500).json(err);
            }
        }
    else
        {
            res.status(403).json("Action Forbidden!");
        }
}

//unfollow user
export const unfollowUser=async(req,res)=>{
    const id=req.params.id;
    const {_id}=req.body;
    if(_id!=id)
        {
            try{
                const followedUser=await userModel.findById(id);
                const followingUser=await userModel.findById(_id);
                if(followedUser.followers.includes(_id))
                    {
                        await followedUser.updateOne({$pull: {followers:_id}});
                        await followingUser.updateOne({$pull:{followings:id}});
                        res.status(200).json("User unfollowed");
                    }
                else
                    {
                        res.status(403).json("user is not followed by you");
                    }
            }
            catch(err){
                res.status(500).json(err);
            }
        }
    else
        {
            res.status(403).json("Action forbidden");
        }
}