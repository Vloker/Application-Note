import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LogoutButton from './../button/Logout';
import Theme from './Theme';
import './../../styles/header.css';

function Header({ text, page, title, logout}) {
    return (
        <header>
            <div className='header' >
                <h1>{title}</h1>
                <div className='link'>
                    <h2><Link to={page}>{text}</Link></h2>
                    <Theme />
                    <LogoutButton intext={logout} />
                </div>
            </div>
        </header>
    );
}

Header.propTypes = {
    text: PropTypes.string,
    page: PropTypes.string,
    title: PropTypes.string,
    logout: PropTypes.string
};

export default Header;
