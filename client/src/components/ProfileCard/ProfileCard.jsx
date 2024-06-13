import React from 'react';
import "./ProfileCard.css";
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
const ProfileCard=()=>{
    const {user}=useSelector((state)=>state.AuthReducer.authData);
    const serverPublic=process.env.REACT_APP_PUBLIC_FOLDER;
    return(
        <div className="ProfileCard">
            <div className="Profile">
                <img src={user.coverPicture?serverPublic+user.coverPicture:serverPublic+"defaultCover.jpg"} alt="" />
                <div className="ProfileName">
                    <img src={user.profilePicture?serverPublic+user.profilePicture:serverPublic+"defaultProfile.jpg"} alt="" />
                    <div className="UserName">
                        <h3>{user.Firstname} {user.Lastname} </h3>
                        <p>{user.worksAt? user.worksAt:"write something about yourself"}</p>
                    </div>
                </div>
            </div>

            <div className="Profile-info">
                <div className="followers">
                    <h3>{user.followers.length}</h3>
                    <p>Followers</p>
                </div>
                <div className="vl"></div>
                <div className="following">
                    <h3>{user.followings.length}</h3>
                    <p>Following</p>
                </div>
            </div> 
            <Link to ={`/profile/${user._id}`} style={{textDecoration:"none"}}>
                <div className="My-Profile">
                    <h3>My Profile</h3>
                </div>  
            </Link>     
        </div>
    )

}
export default ProfileCard;