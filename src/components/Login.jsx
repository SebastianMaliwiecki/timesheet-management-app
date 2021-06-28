import React, { useRef, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext.jsx';
import "./Login.css";

export default function Login() {

    // Sign up form references
    const emailRef = useRef();
    const passRef = useRef();
    // States
    const [loginError, setloginError] = useState("");
    const [buttonActive, setButtonActive] = useState(false);
    const history = useHistory();
    // Sign up state
    const { Login } = useAuthContext();

    const submisionHandler = async (e) => {
        e.preventDefault();
        try {
            setButtonActive(true);
            setloginError(""); // Resets the error state
            await Login(emailRef.current.value, passRef.current.value);
            history.push("/");
        }
        catch (error) {
            console.log(error.message)
            setloginError(error.message);
            setButtonActive(false);
        }
    };

    return (
        <div className="loginPage">
            <div className="loginFormWrap">
                <form className="loginForm">
                    <h1>Account Login</h1>
                    <label className="Labels" for="email">Email</label><br/>
                    <input className="email" type="text" ref={emailRef}></input><br/><br/>
                    <label className="Labels" for="password">Password</label><br/>
                    <input type="password" ref={passRef}></input><br/><br/>
                    <p className={buttonActive ? "errorMessageFalse" : "errorMessageTrue"}>{loginError}</p>
                    <p><Link to="/signup">New user? click to sign up</Link></p>
                    <button type="submit" onClick={submisionHandler} disabled={buttonActive}>{buttonActive ? "Logging in" : "Login"}</button>
                </form>
            </div>
        </div>
    )
}

