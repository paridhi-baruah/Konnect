import * as PostApi from '../api/PostRequests.js';

export const getTimelinePost = (id) => async (dispatch) => {
    dispatch({ type: "RETREIVING_START" });
    try {
      const { data } = await PostApi.getTimelinePost(id);
      console.log("dara",data)
      localStorage.setItem("posts",JSON.stringify(data));
      dispatch({ type: "RETREIVING_SUCCESS", data: data });
    } catch (error) {
      console.log(error);
      dispatch({ type: "RETREIVING_FAIL" });
    }
  };
export const updatePost = (id, userId) => async (dispatch) => {
    dispatch({ type: "UPDATE_POST_START" });

    try {
        const localPosts = JSON.parse(localStorage.getItem("posts"));
        console.log("lo",localPosts);
        const postIndex = localPosts.findIndex(post => post._id === id);
        if (postIndex === -1) {
            console.error("Post not found in local storage.");
            dispatch({ type: "UPDATE_POST_FAIL" });
            return;
        }

        const post = localPosts[postIndex];
        const alreadyLiked = post.likes.includes(userId);

        if (alreadyLiked) {
            post.likes = post.likes.filter(like => like !== userId);
        } else {
            post.likes.push(userId);
        }

        localPosts[postIndex] = post;

        localStorage.setItem('posts', JSON.stringify(localPosts));

        const { data } = await PostApi.LikedPost(id, userId);
        dispatch({ type: "UPDATE_POST_SUCCESS", data });
    } catch (err) {
        console.error("Error while updating local storage or making API call:", err);
        dispatch({ type: "UPDATE_POST_FAIL" });
    }
};

