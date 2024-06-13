import React, { useState } from 'react';
import "./Auth.css";
import WebSiteLogo from '../../components/WebSiteLogo/WebSiteLogo';
import SignUp from '../../components/SignUp/SignUp';
import Login from '../../components/Login/Login';
const Auth=()=>{
    const [isSignUp,setIsSignUp]=useState(false);
    return(
        <div className="Auth">
            <WebSiteLogo/>
            {isSignUp ?<SignUp state={isSignUp} setIsSignUp={setIsSignUp}/>:<Login state={isSignUp} setIsSignUp={setIsSignUp}/>}
        </div>
    )

}
export default Auth;