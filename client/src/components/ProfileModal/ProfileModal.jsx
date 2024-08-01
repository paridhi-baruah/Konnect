import React,{useEffect, useState} from 'react';
import "./ProfileModal.css";
import {UilTimes}from '@iconscout/react-unicons';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {uploadImage} from '../../actions/UploadActions.js';
import { updateUser } from '../../actions/UserActions.js';
import { getUser } from '../../api/UserRequests.js';

function ProfileModal({onClose,data}){
    const[profileImage,setProfileImage]=useState(null);
    const[coverImage,setCoverImage]=useState(null);
    const dispatch=useDispatch();
    const params=useParams();
    const {password,...otherdetails}=data;
    const[formData,setFormData]=useState(otherdetails);
    const {user}=useSelector((state)=>state.AuthReducer.authData);
    // console.log("data",data);
    const ProfileImageChange=(e)=>{
        if (e.target.files && e.target.files[0]){
            let img=e.target.files[0];
            e.target.name==="profilePicture"? setProfileImage(img):setCoverImage(img);
        }
    }
    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
        console.log("print");
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        let userdata=formData;
        if(profileImage)
            {
                const data=new FormData();
                const filename=Date.now()+profileImage.name;
                data.append("name",filename);
                data.append("file",profileImage);
                userdata.profilePicture=filename;
                try{
                    dispatch(uploadImage(data));
                }
                catch(err){
                    console.log(err);
                }
            }
        if(coverImage)
            {
                const data=new FormData();
                const filename=Date.now()+coverImage.name;
                data.append("name",filename);
                data.append("file",coverImage);
                userdata.coverPicture=filename;
                try{
                    dispatch(uploadImage(data));
                }
                catch(err){
                    console.log(err);
                }
            }
        dispatch(updateUser(params.id,{user:userdata}));
        onClose();
    }
    return(
        <div className="ProfileModal">
            <div className="modal-content">
                <UilTimes onClick={onClose} />
                    <h3>Your info</h3>
                <form className='info-details'>
                    <input type="text" placeholder='First Name' name='Firstname'onChange={handleChange} value={formData.Firstname}/>
                    <input type="text" placeholder='Last Name' name='Lastname'onChange={handleChange} value={formData.Lastname}/>
                    <input type="text" placeholder='Works at' id="work" name='worksAt' onChange={handleChange} value={formData.worksAt}/>
                    <input type="text" placeholder='Lives in' name='livesin' onChange={handleChange} value={formData.livesin}/>
                    <input type="text" placeholder='Country' name='country' onChange={handleChange} value={formData.country}/>
                    <input type="text" placeholder='Relationship Status' id="work" name='relationshipStatus' onChange={handleChange} value={formData.relationshipStatus}/>
                </form>
                <div className='info-img'>
                        Profile Image
                        <input type="file" id="profile-image" name="profilePicture" onChange={ProfileImageChange}/>
                        Cover Image
                        <input type="file" id="cover-image" name="coverPicture" onChange={ProfileImageChange}/>
                </div>
                <span style={{color:'red',paddingTop:'0.75vw',fontSize:'1vw'}}>**Reload the page once details are updated**</span>
                <button className='update' onClick={handleSubmit}>Update</button>
            </div>
        </div>
    )

}
export default ProfileModal;