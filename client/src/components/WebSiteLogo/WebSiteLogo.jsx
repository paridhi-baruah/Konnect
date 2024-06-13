import React from 'react';
import "./WebSiteLogo.css";
import logo from '../../img/logo.png';
const WebSiteLogo=()=>{
    return(
        <div className="WebSiteLogo">
           <img src={logo} alt="" /> 
           <div className="social-media">
                <h1>Queens Media</h1>
                <h3>Explore the ideas throughput the world</h3>
           </div>
        </div>
    )

}
export default WebSiteLogo;