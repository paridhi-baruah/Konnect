import React, { useEffect, useState } from 'react';
import "./Followers.css";
import User from '../User/User.jsx';
import { getAllUsers } from '../../api/UserRequests.js';

const Followers = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const [persons, setPersons] = useState([]);

    useEffect(() => {
        const fetchAllUsers = async () => {
            const { data } = await getAllUsers();
            setPersons(data);
            console.log("data", data);
        };
        fetchAllUsers();
    }, []);

    return (
        <div className="Followers">
            <h2>People you may know</h2>
            {persons.map((person, id) => {
                if (person._id !== user.user._id) {
                    return (
                        <User person={person} key={id} />
                    );
                }
                return null;
            })}
        </div>
    );
};

export default Followers;
