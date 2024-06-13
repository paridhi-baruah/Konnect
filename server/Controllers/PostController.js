import postModel from "../Models/postModel.js";
import mongoose from "mongoose";
import userModel from "../Models/userModel.js";


//create a new post
export const createPost=(req,res)=>{
    const newPost=new postModel(req.body);
    newPost.save()
    .then((result)=>{
        res.status(200).json(newPost);
    })
    .catch((err)=>{
        res.status(500).json(err);
    })

}

//get a post
export const getPost=(req,res)=>{
    const id=req.params.id;
    postModel.findById(id)
    .then((result)=>{
        if(result)
            {
                res.status(200).json(result);
            }
        else
            {
                res.status(403).json("Post not Found");
            }
    })
    .catch((err)=>{
        res.status(500).json(err);
    })
}

//update a post
export const updatePost=(req,res)=>{
    const postId=req.params.id;
    postModel.findById(postId)
    .then((post)=>{
        if(post)
            {
                const {userId}=req.body;
                if(post.userId===userId)
                    {
                        postModel.findByIdAndUpdate(postId,req.body,{new:true})
                        .then((result)=>{
                            res.status(200).json(result);
                        })
                        .catch((err)=>{
                            res.status(500).json(err);
                        })
                    }
                else
                    {
                        res.status(403).json("You can only update your own post!")
                    }
            }
        else
            {
                res.status(403).json("No such post exist");
            }
    })
    .catch((err)=>{
        res.status(500).json(err);
    })
}

//delete a post
export const deletePost=(req,res)=>{
    const postId=req.params.id;
    postModel.findById(postId)
    .then((post)=>{
        const {userId}=req.body;
        if(post.userId===userId)
            {
                postModel.findByIdAndDelete(postId,req.body,{new:true})
                .then((result)=>{
                    res.status(200).json("Post Deleted");
                })
                .catch((err)=>{
                    res.status(500).json(err);
                })
            }
        else
            {
                res.status(403).json("Action Forbidden!")
            }
            })
    .catch((err)=>{
        res.status(500).json(err);
    })
}

//like/dislike a post
export const likePost=async(req,res)=>{
    const postId=req.params.id;
    const {userId}=req.body;
    try{
        const post= await postModel.findById(postId);
        if(!post.likes.includes(userId))
            {
                await post.updateOne({$push :{likes: userId}});
                res.status(200).json("Post Liked!");
            }
        else
            {
                await post.updateOne({$pull :{likes: userId}});
                res.status(200).json("Post Disliked!");

            }
    }
    catch(err){
        res.status(500).json(err);
    }
}


//get Timeline Posts
export const getTimelinePosts=async(req,res)=>{
    const userId=req.params.id;
    try{
        const currentUserPosts=await postModel.find({userId: userId});
        const followingPosts=await userModel.aggregate([
            {
                $match:{
                    _id: new mongoose.Types.ObjectId(userId)
                }
            },
            {
                $lookup:{
                    from: "posts",
                    localField:"followings",
                    foreignField:"userId",
                    as:"followingPosts"
                }
            },
            {
                $project:{
                    followingPosts: 1,
                    _id:0
                }
            }
        ])
        const allPosts = currentUserPosts.concat(...followingPosts[0].followingPosts);
        allPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        res.status(200).json(allPosts);
    }
    catch(err){
        res.status(500).json(err);
    }
}


