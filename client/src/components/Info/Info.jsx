import React, { useEffect, useState } from 'react';
import "./Info.css";
import { UilPen } from '@iconscout/react-unicons';
import ProfileModal from '../ProfileModal/ProfileModal';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as UserApi from '../../api/UserRequests.js';
import { logOut } from '../../actions/AuthActions.js';

const Info = () => {
    const [ModalOpen, setModalOpen] = useState(false);
    const dispatch = useDispatch();
    const params = useParams();
    const profileUserId = params.id;
    const [profileUser, setProfileUser] = useState({});
    const { user } = useSelector((state) => state.AuthReducer.authData);

    useEffect(() => {
        const fetchProfileUser = async () => {
            // Ensuring that the user object is available
            if (user && profileUserId === user._id) {
                setProfileUser(user);
                // console.log(user);
            } else {
                const profileUser = await UserApi.getUser(profileUserId);
                setProfileUser(profileUser);
                // console.log(profileUser);
            }
        };
        // fetchProfileUser();
        if(user)setProfileUser(user);
        else 
        // console.log(user);
        console.log("akshat");
    }, [user]);
    
    console.log("user",user);
    const handleLogout = () => {
      dispatch(logOut());
    };
    console.log(profileUser);
    if(!user){
        return(<div>Loading...</div>)
    }

    return (
        <div className="Info">
            <div className='info-title'>
                <h3>Profile info</h3>
                {profileUserId === user._id ? (
                    <div>
                        <UilPen onClick={() => setModalOpen(true)} />
                        {ModalOpen && <ProfileModal onClose={() => setModalOpen(false)} data={user} />}
                    </div>
                ):""}
            </div>
            <div className="profile-info">
                <div className="status">
                    <h4>Status</h4>
                    <p>{profileUser.relationshipStatus}</p>
                </div>
                <div className="status">
                    <h4>Lives in</h4>
                    <p>{profileUser.livesin}</p>
                </div>
                <div className="status">
                    <h4>Country</h4>
                    <p>{profileUser.country}</p>
                </div>
                <div className="status">
                    <h4>Works at</h4>
                    <p>{profileUser.worksAt}</p>
                </div>
                <button className='log-out' onClick={handleLogout}>Log Out</button>
            </div>
        </div>
    );
};

export default Info;
