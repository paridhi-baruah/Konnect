import React from 'react';
import "./PostShare.css";
import {UilScenery} from '@iconscout/react-unicons';
import{UilPlayCircle} from'@iconscout/react-unicons';
import{UilLocationPoint} from'@iconscout/react-unicons';
import {UilSchedule} from '@iconscout/react-unicons';
import { useState,useRef } from "react";
import {UilTimes} from '@iconscout/react-unicons';
import { useDispatch, useSelector } from "react-redux";
import { uploadImage, uploadPost,uploadVideo } from '../../actions/UploadActions.js';
const PostShare=()=>{
    const[image,setImage]=useState(null);
    const[video,setVideo]=useState(null);
    const loading=useSelector((state)=>state.PostReducer.uploading);
    const imageRef=useRef();
    const videoRef=useRef();
    const desc=useRef();
    const dispatch=useDispatch();
    const {user}=useSelector((state)=>state.AuthReducer.authData);
    const serverPublic=process.env.REACT_APP_PUBLIC_FOLDER;
    function ImageChange(e){
        if (e.target.files && e.target.files[0]){
            let img=e.target.files[0];
            setImage(img);
        }
    }
    const reset=()=>{
        setImage(null);
        setVideo(null);
        desc.current.value="";
    }
    function VideoChange(e){
        if (e.target.files && e.target.files[0]){
            let vid=e.target.files[0];
            setVideo(vid);
        }
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        const newPost={
            userId:user._id,
            desc:desc.current.value
        };
        if(image || video)
        {
            const data=new FormData();
            if(image)
                {
                    const imgfilename=Date.now()+image.name;
                    data.append('name',imgfilename);
                    data.append('file',image);
                    newPost.image=imgfilename;
                    console.log(newPost);
                    try{
                        dispatch(uploadImage(data));
                    }
                    catch(err)
                    {
                        console.log(err);
                    }
                }
            else
                {
                    const filename=Date.now()+video.name;
                    data.append('name',filename);
                    data.append('file',video);
                    newPost.video=filename;
                    console.log(newPost);
                    try{
                        dispatch(uploadVideo(data));
                    }
                    catch(err)
                    {
                        console.log(err);
                    }
                }
            try{
                dispatch(uploadImage(data));
            }
            catch(err)
            {
                console.log(err);
            }
            dispatch(uploadPost(newPost));
            reset();
        }
    }
    if(!user){
        return(<div>Loading...</div>)
    }
    return(
        <div className="PostShare">
            <div className="post-share-grid">
            <div className="share-info">
                <img src={user.profilePicture?serverPublic+user.profilePicture:serverPublic+"defaultProfile.jpg"} alt="" />
                <input type="text" ref={desc} placeholder="What's happening?" required />
             </div>
             <div className="post-options">
                <div className="photo-upload" onClick={()=>imageRef.current.click()}>
                    <UilScenery/>
                    <p>Photo</p>
                </div>
                <div className="video-upload" onClick={()=>videoRef.current.click()}>
                    <UilPlayCircle/>
                    <p>Video</p>
                </div>
                <div className="location-upload">
                    <UilLocationPoint/>
                    <p>Location</p>
                </div>
                <div className="schedule-upload">
                    <UilSchedule/>
                    <p>Schedule</p>
                </div>
                <button className="share-button" onClick={handleSubmit} disabled={loading}>
                    {loading? "Uploading...":"Share"}
                </button>
                <div style={{display:'none'}}>
                    <input type="file" ref={imageRef} name="file" onChange={ImageChange}/>
                    <img src={image} alt="" />
                </div>
                <div style={{display:'none'}}>
                    <input type="file" ref={videoRef} name="file" onChange={VideoChange}/>
                    <img src={video} alt="" />
                </div>
             </div>
            </div>
            {image && (
                <div className="preview-image">
                    <UilTimes onClick={() => setImage(null)} />
                    <img src={URL.createObjectURL(image)} alt="" />
                </div>
            )}

            {video &&(
                <div className="preview-video">
                <UilTimes onClick={()=>setVideo(null)}/>
                <video src={URL.createObjectURL(video)} controls/>
            </div>
             )}
        </div>
    )

}
export default PostShare;