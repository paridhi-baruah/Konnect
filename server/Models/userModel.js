import mongoose from "mongoose";

const UserSchema= mongoose.Schema(
    {
        username:{
            type: String,
            required: true
        },
        password:{
            type: String,
            required: true
        },
        Firstname:{
            type: String,
            required: true
        },
        Lastname:{
            type: String,
            required: true
        },
        isAdmin:{
            type: Boolean,
            default:false
        },
        profilePicture: String,
        coverPicture: String,
        about: String,
        livesin: String,
        worksAt: String,
        relationshipStatus:String,
        country:String,
        followers:[],
        followings:[]
    },
    {timestamps:true} //track these two things:created and updated at
)
const UserModel=mongoose.model("Users",UserSchema);
export default UserModel;