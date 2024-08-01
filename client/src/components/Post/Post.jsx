import React, { useState,useEffect } from 'react';
import './Post.css';
import like from '../../img/like.png';
import comment from '../../img/comment.png';
import share from '../../img/share.png';
import notlike from '../../img/notlike.png';
import { useDispatch } from 'react-redux';
import { updatePost } from '../../actions/PostActions';

const Post = ({ post }) => {
    const { user } = JSON.parse(localStorage.getItem('profile'));
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(post.likes.length);
    const dispatch = useDispatch();
    const localPosts = JSON.parse(localStorage.getItem('posts')) || [];
    useEffect(() => {
        const localPost = localPosts.find(localPost => localPost._id === post._id);
        if (localPost) {
            setLiked(localPost.likes.includes(user._id));
            setLikes(localPost.likes.length);
        }
    }, [post._id, user._id]);

    const handleLike = () => {
        dispatch(updatePost(post._id, user._id));
        setLiked((prevLiked) => !prevLiked);
        setLikes((prevLikes) => liked ? prevLikes - 1 : prevLikes + 1);
    };

    return (
        <div className="PostGrid">
            {post.image && (
                <img
                    src={process.env.REACT_APP_PUBLIC_FOLDER + post.image}
                    className='postpic'
                    alt=""
                />
            )}
            {post.video && (
                <div className="video-container">
                    <video
                        src={process.env.REACT_APP_PUBLIC_FOLDER + post.video}
                        className='postpic'
                        controls
                    />
                </div>
            )}
            <div className="post-icons">
                <img
                    src={liked ? like : notlike}
                    className="like"
                    alt=""
                    onClick={handleLike}
                />
                <img src={comment} className='comment' alt="" />
                <img src={share} className='share' alt="" />
            </div>
            <div className="like-count">{likes} likes</div>
            <div className="user-info">
                <h3>{post.name}</h3>
                <p>{post.desc}</p>
            </div>
        </div>
    );
};

export default Post;
