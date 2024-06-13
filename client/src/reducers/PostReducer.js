const PostReducer=(
    state={posts:[], loading:false, error:false,uploading:false},
    action
  )=>{
    switch(action.type)
    {
       case "UPLOAD_START":
            return{...state,error:false,uploading:true};
        case "UPLOAD_SUCCESS":
        return{...state,posts:[action.data,...state.posts],lerror:false,uploading:false};
        case "POST_FAIL":
            return{...state,error:true,uploading:false};
        default:
                return state;
    }
  }
  
  export default PostReducer;