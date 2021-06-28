import React, { useRef, useState } from 'react';
import { useAuthContext } from '../context/AuthContext.jsx';
import { useHistory } from 'react-router-dom';

export default function Signup() {

    // Sign up form references
    const emailRef = useRef();
    const passRef = useRef();
    const passConfirmationRef = useRef();
    // States
    const [signUpError, setSignUpError] = useState("");
    // Sign up state
    const { signUp } = useAuthContext();
    const history = useHistory();

    const submisionHandler = async (e) => {
        e.preventDefault();
        try {
            setSignUpError(""); // Resets the error state
            await signUp(emailRef.current.value, passRef.current.value);
            history.push("/");
        }
        catch (error) {
            setSignUpError(error.message);
            console.log(error.message);
        }
    };

    return (
        <div>
            <form>
                <label for="email">Email</label><br/>
                <input type="text" ref={emailRef}></input><br/><br/>
                <label for="password">Password</label><br/>
                <input type="text" ref={passRef}></input><br/><br/>
                <label for="passowrdconfirm">Password Confirmation</label><br/>
                <input type="text" ref={passConfirmationRef}></input><br/><br/>
                <input type="submit" value="Sign up" onClick={submisionHandler}></input>
            </form>
            <p>
                {signUpError}
            </p>
        </div>
    )
}
