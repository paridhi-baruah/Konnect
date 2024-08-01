import * as UploadApi from'../api/UploadRequests.js';
export const uploadImage=(data)=>async(dispatch)=>{
    try{
        await UploadApi.uploadImage(data);
    }
    catch(err){
        console.log(err);
    }
}
export const uploadPost = (data) => async (dispatch) => {
    dispatch({ type: "UPLOAD_START" });
    try {
      const newPost =await UploadApi.uploadPost(data);
      console.log("new",newPost.data);
      dispatch({ type: "UPLOAD_SUCCESS", data: newPost.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: "UPLOAD_FAIL" });
    }
  };
export const uploadVideo=(data)=>async(dispatch)=>{
    try{
        await UploadApi.uploadVideo(data);
    }
    catch(err){
        console.log(err);
    }
}