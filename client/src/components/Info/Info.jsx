import React, { useEffect, useState } from 'react';
import "./Info.css";
import { UilPen } from '@iconscout/react-unicons';
import ProfileModal from '../ProfileModal/ProfileModal';
import { Link,useNavigate, useParams } from 'react-router-dom';
import * as UserApi from '../../api/UserRequests.js';

const Info = () => {
    const [ModalOpen, setModalOpen] = useState(false);
    const params = useParams();
    const navigate=useNavigate();
    const profileUserId = params.id;
    const [profileUser, setProfileUser] = useState({});
    const {user}=JSON.parse(localStorage.getItem('profile'));
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
        fetchProfileUser();
    }, []);
    const handleLogout = () => {
        localStorage.clear();
        window.location.reload();
    };
    if(!user){
        return(navigate('/auth'))
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
