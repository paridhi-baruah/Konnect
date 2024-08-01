const AuthReducer=(
  state={authData:null, loading:false, error:false,updateloading:false},
  action
)=>{
  switch(action.type)
  {
     case "AUTH_START":
          return{...state,loading:true,error:false};
      case "AUTH_SUCCESS":
          localStorage.setItem("profile",JSON.stringify(action?.data));
      return{...state,authData:action.data,loading:false,error:false};
      case "AUTH_FAIL":
          return{...state,loading:false,error:true};
      case "UPDATE_START":
        return{...state,updateloading:true,error:false};
      case "UPDATE_SUCCESS":
          console.log("action",action.data);
            localStorage.setItem("profile",JSON.stringify({user:action?.data}));
      return{...state,authData:action.data,updateloading:false,error:false};
      case "UPDATE_FAIL":
          return{...state,updateloading:false,error:true}; 
      case "FOLLOW":
          return{...state,authData:{...state.authData,user:{...state.authData.user,followings:[...state.authData.user.followings, action.data]}}};
          case "UNFOLLOW":
            return{...state,authData:{...state.authData,user:{...state.authData.user,followings:state.authData.user.followings.filter((personId)=>personId!==action.data)}}};
      case "LOG_OUT":
          localStorage.clear();
          return{...state,authData:null,loading:false,error:false};   
      default:
          return state;
  }
}

export default AuthReducer;