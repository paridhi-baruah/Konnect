import React from 'react';
import "./ProfileMid.css";
import PostSide from '../../components/PostSide/PostSide'
import MidProfileCard from '../../components/MidProfileCard/MidProfileCard';
const ProfileMid=()=>{
    return(
        <div className="ProfileMid">
            <MidProfileCard/>
            <PostSide/>
        </div>
    )

}
export default ProfileMid;