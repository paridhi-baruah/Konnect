import React from 'react';
import "./ProfileLeft.css";
import Info from '../../components/Info/Info';
import LogoSearch from '../../components/LogoSearch/LogoSearch';
import Followers from '../../components/Followers/Followers';
const ProfilePage=()=>{
    return(
        <div className="ProfileLeft">
            
            <LogoSearch/>
            <Info/>
            <Followers/>
        </div>
    )

}
export default ProfilePage;