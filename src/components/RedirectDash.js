import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

export default function RedirectDash({ component:Component, ...rest }) {

    const { CurrentUser } = useAuthContext();

    return (
        <Route
            {...rest}
            render={props => {
                return CurrentUser ? <Component /> : <Redirect to="/login" />
            }}
        />
    )
}
