import React, { useState } from 'react';
import "./Login.css";
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '../../actions/AuthActions.js';

const Login = ({ isSignUp, setIsSignUp }) => {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.AuthReducer.loading);
    const loginError = useSelector((state) => state.AuthReducer.error);

    const [data, setData] = useState({ username: "", password: "" });
    const [attemptedLogin, setAttemptedLogin] = useState(false); // Track if login attempt has been made

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault(); 
        setAttemptedLogin(true);
        dispatch(logIn(data));
    }

    return (
        <div className="Login">
            <form className='a-login' onSubmit={handleSubmit}>
                <h2>Log In</h2>
                <div>
                    <input type="text" name="username" placeholder='Username' onChange={handleChange} required />
                    <input type="password" name="password" placeholder='Password' onChange={handleChange} required />
                </div>
                <span style={{ display: (attemptedLogin && loginError) ? 'block' : 'none', color: 'red', alignSelf: 'flex-end', paddingRight: '1.5vw' }}>
                    **Wrong username or password**
                </span>
                <div className="has-acc">
                    <div onClick={() => setIsSignUp((prev) => !prev)} style={{ cursor: 'pointer' }}>
                        Don't have an account? Sign up!
                    </div>
                    <button className="Login-button" disabled={loading}>
                        {loading ? "Loading..." : "Login"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;
