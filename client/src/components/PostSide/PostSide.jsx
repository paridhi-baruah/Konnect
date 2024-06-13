import React from 'react';
import "./PostSide.css";
import PostShare from '../PostShare/PostShare';
import PostGrid from '../PostGrid/PostGrid';
const PostSide=()=>{
    return(
        <div className="PostSide">
             <PostShare/>
             <PostGrid/>
        </div>
    )

}
export default PostSide;