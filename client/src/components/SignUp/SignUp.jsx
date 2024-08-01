// src/components/SignUp/SignUp.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./SignUp.css";
import { signUp } from '../../actions/AuthActions.js'; // Correctly imported

const SignUp = ({ isSignUp, setIsSignUp }) => {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.AuthReducer.loading);
    console.log(loading);
    const [data, setData] = useState({ Firstname: "", Lastname: "", username: "", password: "", confirmpassword: "" });
    const [confirmpass, setConfirmPass] = useState(true);
    const signuperror=useSelector((state)=>state.AuthReducer.error);
    const [attemptedSignUp,setAttemptedSignUp]=useState(false);
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const pass_err = (e) => {
        e.preventDefault();
        setAttemptedSignUp(true);
        if (data.password === data.confirmpassword) {
            dispatch(signUp(data));
        } else {
            setConfirmPass(false);
            setAttemptedSignUp(false);
        }
    };

    return (
        <div className="SignUp">
            <form className='a-sign' onSubmit={pass_err}>
                <h2>Sign Up</h2>
                <div>
                    <input type="text" name="Firstname" placeholder='First Name' id="Firstname" onChange={handleChange} required/>
                    <input type="text" name="Lastname" placeholder='Last Name' id="Lastname" onChange={handleChange} required />
                    <input type="text" name="username" placeholder='Username' id="username" onChange={handleChange} required/>
                    <input type="password" name="password" placeholder='Password' id="password" required onChange={handleChange}/>
                    <input type="password" name="confirmpassword" placeholder='Confirm Password' id="confirmpassword" required onChange={handleChange} />
                </div>
                <span style={{ display: confirmpass ? 'none' : 'block', color: 'red', alignSelf: 'flex-end', paddingRight: '1.5vw' }}>
                    **Confirm password is not the same**
                </span>
                <span style={{ display: (attemptedSignUp && signuperror) ? 'block' : 'none', color: 'red', alignSelf: 'flex-end', paddingRight: '1.5vw' }}>
                    **username is already registered**
                </span>
                <div className="has-acc">
                    <div onClick={() => setIsSignUp((prev) => !prev)} style={{ cursor: 'pointer' }}>
                        Already have an account? Login!
                    </div>
                    <button className="SignUp-button" type="submit" disabled={loading}>
                        {loading ? 'Loading...' : 'Sign Up'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SignUp;
