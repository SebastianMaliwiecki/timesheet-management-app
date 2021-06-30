import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext.jsx';
import { useHistory } from 'react-router-dom';
import { Grid, TextField } from '@material-ui/core';
import "./Dashboard.css";
import logo from "./logo_small.png";

export default function Signup() {

    // Sign up form references
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const passRef = useRef();
    //const passConfirmationRef = useRef();
    // States
    const [signUpError, setSignUpError] = useState("");
    // Sign up state
    const { signUp,insertUserInfo } = useAuthContext();
    const history = useHistory();

    const submisionHandler = async (e) => {
        e.preventDefault();
        try {
            setSignUpError(""); // Resets the error state
            await signUp(
                emailRef.current.value, 
                passRef.current.value,
            );
            await insertUserInfo(
                firstNameRef.current.value,
                lastNameRef.current.value,
                emailRef.current.value, 
                passRef.current.value,
            );
            history.push("/");
        }
        catch (error) {
            setSignUpError(error.message);
            //console.log(error.message);
        }
    };

    return (
        <div className="signUpPage">
            <div className="signUpWrap">
                <form className="signUp">
                        <figure>
                            <img className="logo" src={logo} alt="TrackMyPay"></img>
                        </figure>
                        <h1>Account Sign-up</h1>
                        <div>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="fname"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                        inputRef={firstNameRef}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="lname"
                                        inputRef={lastNameRef}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        inputRef={emailRef}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        inputRef={passRef}
                                    />
                                </Grid>
                            </Grid>
                        </div>
                        <div className="options">
                            <p>
                                <Link to="/login">
                                    Already have an account?
                                </Link>
                            </p>
                            <button type="submit" onClick={submisionHandler}>Sign up</button>
                        </div>
                    {/* <label for="firstnames">Firstname</label><br/>
                    <input type="text" ref={firstNameRef}></input><br/><br/>

                    <label for="lastname">Lastname</label><br/>
                    <input type="text" ref={lastNameRef}></input><br/><br/>

                    <label for="email">Email</label><br/>
                    <input type="text" ref={emailRef}></input><br/><br/>

                    <label for="password">Password</label><br/>
                    <input type="text" ref={passRef}></input><br/><br/>

                    <label for="passowrdconfirm">Password Confirmation</label><br/>
                    <input type="text" ref={passConfirmationRef}></input><br/><br/> */}
                    
                </form>
            </div>
            
            <p>
                {signUpError}
            </p>
        </div>
    )
}
