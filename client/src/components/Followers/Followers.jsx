import React from 'react';
import "./Followers.css";
import { FollowerData} from '../../Data/FollowerData';
const Followers=()=>{
    return(
        <div className="Followers"> 
        <h2>Who is following you</h2>
        {FollowerData.map((follower,id)=>{
            return(
                <div className="follower-info">
                <img src={follower.img} alt="" />
                <div className="user-id">
                    <h3>{follower.name}</h3>
                    <p>@{follower.username}</p>
                </div>
                <button className="follow-button">
                    Follow
                </button>
            </div>
            )
        })}
        </div>
    )

}
export default Followers;