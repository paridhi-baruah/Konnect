import React from 'react';
import "./Home.css";
import Profile from "../../components/ProfileSide/Profile";
import PostSide from "../../components/PostSide/PostSide";
import RightSide from '../../components/RightSide/RightSide';
const Home=()=>{
    return(
        <div className="Home">
            <Profile/>
            <PostSide/>
            <RightSide/>
        </div>
    )

}
export default Home;