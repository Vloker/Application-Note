import React from 'react';
import { useTheme } from '../../context/context';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import './../../styles/logout.css';

function LogoutButton({intext}) {
  const { theme } = useTheme();
  const themeClass = theme ? 'dark-theme' : 'light-theme';
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.setItem('isLoggedIn', 'false');
    navigate('/');
  };

  return (
    <button 
      id='logout'
      onClick={handleLogout} 
      className={themeClass}>{intext}</button>
  );
}

export default LogoutButton;

LogoutButton.propTypes = {
  intext: PropTypes.string
}


