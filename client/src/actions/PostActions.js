import * as PostApi from '../api/PostRequests.js';
export const getTimelinePost=(id)=>async(dispatch)=>{
    dispatch({type:"RETREIVING_START"});
    try{
        const data=await PostApi.getTimelinePost(id);
        dispatch({type:"RETREIVING_SUCCESS",data:data});
    }
    catch(err){
        console.log(err);
        dispatch({type:"RETREIVING_FAIL"});
    }
}