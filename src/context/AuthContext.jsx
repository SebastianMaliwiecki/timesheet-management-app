import React, { useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';

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
        return auth.createUserWithEmailAndPassword(email, password);
    };

    const Login = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password);
    };
     
    const Logout = () => { 
        return auth.signOut(); 
    };

    const insertUserInfo = (email, password, firstName, lastName) => {
        return db.collection('users').doc(email).set({
            Firstname: firstName,
            Lastname: lastName,
            Email: email,
            Password: password
        })
    };

    // Our context 
    const userInfo = {
        CurrentUser,
        signUp,
        Login,
        Logout,
        insertUserInfo,
    };

    return (
        <authContext.Provider value={userInfo}>
            {!loading && children}
        </authContext.Provider>
    )
}
