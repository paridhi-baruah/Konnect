import React, { useState } from 'react';
import './Post.css';
import like from '../../img/like.png';
import comment from '../../img/comment.png';
import share from '../../img/share.png';
import notlike from '../../img/notlike.png';
import { useSelector } from 'react-redux';
import { LikedPost } from '../../api/PostRequests';

const Post = ({ post }) => {
    const { user } = useSelector((state) => state.AuthReducer.authData);
    const [liked, setLiked] = useState(post.likes.includes(user._id));
    const [likes, setLikes] = useState(post.likes.length);

    const handleLike = () => {
        setLiked((prev) => !prev);
        LikedPost(post._id,user._id);
        liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
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
