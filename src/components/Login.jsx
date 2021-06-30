import React, { useRef, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext.jsx';
import "./Login.css";
import logo from "./logo_small.png";
import {TextField} from '@material-ui/core/';

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
                <figure>
                    <img className="logo" src={logo} alt="TrackMyPay"></img>
                </figure>
                <form className="loginForm">
                    <h1>Account Login</h1>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        inputRef={emailRef}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        inputRef={passRef}
                    />
                    {/* <label className="Labels" for="email">Email</label><br/>
                    <input className="email" type="text" ref={emailRef}></input><br/><br/>
                    <label className="" for="password">Password</label><br/>
                    <input type="password" ref={passRef}></input><br/><br/> */}
                    <p className={buttonActive ? "errorMessageFalse" : "errorMessageTrue"}>{loginError}</p>
                    <div className="formOptions">
                        <p>
                            <Link to="/signup">
                                New user? click to sign up
                            </Link>
                        </p>
                        <button type="submit" onClick={submisionHandler} disabled={buttonActive}>{buttonActive ? "Logging in" : "Login"}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

