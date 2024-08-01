import * as UserApi from'../api/UserRequests.js';
export const updateUser=(id,formData)=>async(dispatch)=>{
    dispatch({type:"UPDATE_START"});
    try{

        const {data}=await UserApi.updateUser(id,formData);
        dispatch({type:"UPDATE_SUCCESS",data:data});
    }
    catch(err){
        console.log(err);
        dispatch({type:"UPDATE_FAIL"});
    }
}
export const followUser=(id,data)=>async(dispatch)=>{
    dispatch({type:"FOLLOW"});
    var user=JSON.parse(localStorage.getItem('profile'));
    user.user.followings.push(id)
    // console.log()
    console.log("id",id);
    // user.user.followings=followList;
    console.log("user",user);
    localStorage.setItem('profile',JSON.stringify(user));
    await UserApi.followUser(id,data);
}
export const unfollowUser=(id,data)=>async(dispatch)=>{
    dispatch({type:"UNFOLLOW"});
    var user=JSON.parse(localStorage.getItem('profile'));
    var followList=user.user.followings.filter(followUser=>{
        return followUser!=id
    })
    console.log("id",id);
    user.user.followings=followList;
    console.log("user_un",user);
    localStorage.setItem('profile',JSON.stringify(user));
    await UserApi.unfollowUser(id,data);
}