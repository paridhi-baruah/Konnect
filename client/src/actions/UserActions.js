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