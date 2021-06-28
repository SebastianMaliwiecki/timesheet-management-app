import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';

const authContext = React.createContext();

export function useAuthContext() {
    return useContext(authContext);
};

export function AuthProvider({ children }) {

    const [CurrentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    /* Only want to run this once so when the component is mounted to check
    if any current user is logged in or not*/
    useEffect(() => {
        const unSub = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        });
        // This will unsubscribe from this the listener when we unmount this component
        return unSub;
    }, []);

    // Add user detail to authenticaiton
    const signUp = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password)
    };

    const Login = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password)
    };
     
    const Logout = () => { 
        auth.signOut(); 
    };

    // Our context 
    const userInfo = {
        CurrentUser,
        signUp,
        Login,
        Logout,
    };

    return (
        <authContext.Provider value={userInfo}>
            {!loading && children}
        </authContext.Provider>
    )
}
