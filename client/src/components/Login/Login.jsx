import React, { useState } from 'react';
import "./Login.css";
import {useDispatch,useSelector} from 'react-redux';
import { logIn } from '../../actions/AuthActions.js';
const Login=({isSignUp,setIsSignUp})=>{
    const dispatch=useDispatch();
    const loading=useSelector((state)=>state.AuthReducer.loading);
    console.log(loading);
    const[data,setData]=useState({username:"",password:""});
    const handleChange=(e)=>{
        setData({...data,[e.target.name]:e.target.value});
    }
    const pass_err=(e)=>{
        e.preventDefault()      //so that our page do not redirect to other page
        dispatch(logIn(data));

    }
    return(
        <div className="Login" onSubmit={pass_err}>
            <form className='a-login'>
                <h2>Log In</h2>
                <div>
                    <input type="text" name="username" placeholder='Username' id=""  onChange={handleChange}/>
                    <input type="password" name="password" placeholder='Password' id="" required onChange={handleChange}/>
                </div>
                <div className="has-acc" >
                    <div onClick={()=>setIsSignUp((prev)=>!prev)} style={{cursor:'pointer'}}>Don't have an account? Sign up!</div>
                    <button className="Login-button" disabled={loading}>
                    {loading?"Loading...":"Login"}
                    </button>
                </div>
            </form>
        </div>
    )

}
export default Login;