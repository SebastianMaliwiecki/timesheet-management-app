import React from 'react'
import { useHistory } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext'

export default function Dashboard() {

    const { Logout, CurrentUser } = useAuthContext();
    const history = useHistory();

    const logoutHandler = async () => {
        try {
            await Logout();
            history.push("/login");
        }
        catch {

        }
    };

    return (
        <div>
            <h1>Dashboard</h1> 
            <br></br>
            Currently logged in with email: <b>{CurrentUser.email}</b><br></br><br></br>
            <button onClick={logoutHandler}>Logout</button>
        </div>
    )
}
