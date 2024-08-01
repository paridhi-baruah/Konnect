import React, { useEffect } from 'react';
import './PostGrid.css';
import Post from '../Post/Post.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getTimelinePost } from '../../actions/PostActions';
import {useParams} from "react-router-dom";
const PostGrid = () => {
    const dispatch = useDispatch();
    const {user,followings}=JSON.parse(localStorage.getItem('profile'));

    let { posts, loading } = useSelector((state) => state.PostReducer);
    const params=useParams();
    // Fetching posts
    useEffect(() => {
        if(user && user._id)
            dispatch(getTimelinePost(user._id));
    }, []);
    if(!posts)return "No Posts";
    if(params.id)posts=posts.filter((post)=>post.userId===params.id);
    return (
        <div className="PostGridTemplate">
            {loading ? "Fetching Posts..." :
                posts.map((post, id) => (
                    <Post key={id} post={post} />
                ))
            }
        </div>
    );
};

export default PostGrid;
