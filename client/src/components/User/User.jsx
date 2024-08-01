import React, { useState } from 'react';
import "./User.css";
import { useDispatch, useSelector } from 'react-redux';
import { followUser, unfollowUser } from '../../actions/UserActions.js';
const User=({person})=>{
const dispatch=useDispatch();
// const {user}=useSelector((state)=>state.AuthReducer.authData);
const {user} = JSON.parse(localStorage.getItem('profile'));
const serverPublic=process.env.REACT_APP_PUBLIC_FOLDER;
const [following,setFollowing]=useState(person.followers.includes(user._id));//to check whether you are following or not
console.log("fol",following);
const handleFollow=()=>{
    if (following) {
        console.log("hel")
        dispatch(unfollowUser(person._id,{user:user}));
        console.log("unfollow",{user:user});
    } else {
        dispatch(followUser(person._id,{user:user}));
        console.log("follow");
    }
setFollowing((prev)=>!prev);
}
return(
<div className="follower-info">
<img src={person.profilePicture?serverPublic+person.profilePicture:serverPublic
+"defaultProfile.png"} alt="" />
<div className="user-id">
<h3>{person.Firstname}</h3>
<p>{person.username}</p>
</div>
<button className={following?"unfollow":"follow-button"} onClick={handleFollow}>
{following? "Unfollow":"Follow"}
</button>
</div>
)

}
export default User;