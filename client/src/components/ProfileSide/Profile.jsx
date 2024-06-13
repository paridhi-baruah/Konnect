import React from 'react';
import "./Profile.css";
import LogoSearch from '../LogoSearch/LogoSearch';
import ProfileCard from '../ProfileCard/ProfileCard';
import Followers from '../Followers/Followers';
const Profile=()=>{
    return(
        <div className="ProfileSide">
            <LogoSearch/>
            <ProfileCard/>
            <Followers/>
            {/* <ProfileCard/> */}
            {/* <FollowingCard/> */}
        </div>
    )

}
export default Profile;