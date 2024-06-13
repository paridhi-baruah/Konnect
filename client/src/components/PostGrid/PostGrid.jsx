import React, { useEffect } from 'react';
import './PostGrid.css';
import Post from '../Post/Post.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getTimelinePost } from '../../actions/PostActions';

const PostGrid = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.AuthReducer.authData);
    const { posts, loading } = useSelector((state) => state.PostReducer);

    // Fetching posts
    useEffect(() => {
        if(user && user._id)
            dispatch(getTimelinePost(user._id));
    }, [dispatch, user]);

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
