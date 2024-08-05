import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from "cors";
import AuthRoute from './Routes/AuthRoute.js';
import UserRoute from './Routes/UserRoute.js';
import PostRoute from './Routes/PostRoute.js';
import UploadRoute from './Routes/UploadRoute.js';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI=new GoogleGenerativeAI(process.env.API_KEY);
const generationConfig={temperature:0.9,topP:1,topK:1,maxOutputTokens:4096};
const model=genAI.getGenerativeModel({model:"gemini-pro",generationConfig});
//Routes
const app=express();

//to serve images for public
app.use(express.static('public'));
app.use('/images',express.static("images"));

//Middleware
app.use(bodyParser.json({limit:'30mb',extended:true}));
app.use(bodyParser.urlencoded({limit:'30mb',extended:true}));
app.use(cors());
dotenv.config();
// Endpoint for GoogleGenerativeAI
app.post('/chat', async (req, res) => {
    const { about,feeling, mood, place } = req.body;
    const prompt = `Create an aesthetic instagram caption about ${about}. I am feeling ${feeling}, my mood is ${mood}, and the photo is being taken at ${place}.The caption should not be more than 25 words and must include relevant hashtags.`;
    console.log(prompt);
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const responseBody = await response.text();
      res.send(responseBody);
    } catch (error) {
      console.error('Error generating content:', error);
      res.status(500).send('Internal Server Error');
    }
  });
mongoose.connect(process.env.MONGO_DB)
    .then(()=>{app.listen(process.env.PORT,()=>console.log(`listening at ${process.env.PORT}`))})
    .catch((err)=>console.log(err));

//usage of routes
app.use('/auth',AuthRoute);
app.use('/user',UserRoute);
app.use('/post',PostRoute);
app.use('/upload',UploadRoute);


