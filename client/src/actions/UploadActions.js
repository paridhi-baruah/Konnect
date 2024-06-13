import * as UploadApi from'../api/UploadRequests.js';
export const uploadImage=(data)=>async(dispatch)=>{
    try{
        await UploadApi.uploadImage(data);
    }
    catch(err){
        console.log(err);
    }
}
export const uploadPost=(data)=>async(dispatch)=>{
    dispatch({type:"UPLOAD_START"});
    try{
        const newPost=await UploadApi.uploadPost(data);
        dispatch({type:"UPLOAD_SUCCESS",data:newPost.data});
    }
    catch(err){
        console.log(err);
        dispatch({type:"UPLOAD_FAIL"});
    }
}
export const uploadVideo=(data)=>async(dispatch)=>{
    try{
        await UploadApi.uploadVideo(data);
    }
    catch(err){
        console.log(err);
    }
}