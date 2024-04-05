import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
    if (localStorage.getItem('isLoggedIn')==='true') {
        return (<Component ></Component>)
    } else {
        return <Navigate to="/" />
    }
    }

export default PrivateRoute;
