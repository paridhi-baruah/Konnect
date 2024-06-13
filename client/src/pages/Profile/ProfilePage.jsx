import React from 'react';
import "./ProfilePage.css";
import ProfileLeft from '../../components/ProfileLeft/ProfileLeft';
import RightSide from '../../components/RightSide/RightSide';
import ProfileMid from '../../components/ProfileMid/ProfileMid';
const ProfilePage=()=>{
    return(
        <div className="ProfilePage">
           <ProfileLeft/> 
            <ProfileMid/>
           <RightSide/>
        </div>
    )

}
export default ProfilePage;