import axios from "axios";
const API=axios.create({baseURL:"http://localhost:5000"});
export const getTimelinePost=(id)=>API.get(`/post/${id}/timeline`);
export const LikedPost=(id,userId)=>API.put(`/post/${id}/like`,{userId:userId});
