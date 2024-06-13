import React,{useState} from 'react';
import "./ShareModal.css";
import {UilTimes}from '@iconscout/react-unicons';
import PostShare from '../PostShare/PostShare';

function ShareModal({onClose}){
    return(
        <div className="ShareModal">
            <div className="share-modal-content">
                <UilTimes className="cross" onClick={onClose} />
                <PostShare/>
            </div>
        </div>
    )

}
export default ShareModal;