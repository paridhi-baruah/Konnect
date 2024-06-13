import React from 'react';
import "./MidProfileCard.css";
import { useSelector } from 'react-redux';
const MidProfileCard=()=>{
    const {user}=useSelector((state)=>state.AuthReducer.authData);
    const posts=useSelector((state)=>state.PostReducer.posts);
    const serverPublic=process.env.REACT_APP_PUBLIC_FOLDER;
    if(!user){
        return(<div>Loading...</div>)
    }
        
    return(
        <div className="MidProfileCard">
            <img src={user.coverPicture?serverPublic+user.coverPicture:serverPublic+"defaultCover.jpg"} alt="" className="MidProfile"/>
                <div className="Mid_ProfileName">
                    <img src={user.profilePicture?serverPublic+user.profilePicture:serverPublic+"defaultProfile.jpg"} alt="" />
                    <div className="Mid_UserName">
                        <h3>{user.Firstname} {user.Lastname}</h3>
                        <p>{user.worksAt? user.worksAt:"write something about you"}</p>
                    </div>
                </div>

            <div className="Mid_Profile-info">
                <div className="Mid_followers">
                    <h3>{user.followers.length}</h3>
                    <p>Followers</p>
                </div>
                <div className="vl"></div>
                <div className="Mid_following">
                    <h3>{user.followings.length}</h3>
                    <p>Following</p>
                </div>
                <div className="vl"></div>
                <div className="Mid_following">
                <h3>{posts.filter((post)=>post.userId===user._id).length}</h3>
                <p>Posts</p>
                </div>
            </div>       
        </div>
    )

}
export default MidProfileCard;