import React from 'react';
import "./Navbar.css";
import home from '../../img/home.png';
import {UilSetting} from '@iconscout/react-unicons';
import noti from '../../img/noti.png';
import comment from '../../img/comment.png';
import { Link } from 'react-router-dom';
const Navbar=()=>{
    return(
        <div className="Navbar">
            <Link to="/home">
                <img src={home} alt="" />
            </Link>
            <UilSetting className="setting"/>
            <img src={noti} alt="" />
            <img src={comment} alt="" />
        </div>
    )

}
export default Navbar;