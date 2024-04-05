import React from 'react';
import {Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, ...rest }) => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
        return <Component />;
    } else {
        return <Navigate to="/" />;
    }
};

PrivateRoute.propTypes = {
    component: PropTypes.elementType.isRequired
};

export default PrivateRoute;
