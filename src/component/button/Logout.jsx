import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/context';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { getUserLogged } from '../../utils/network';
import './../../styles/logout.css';

function LogoutButton({ intext }) {
  const { theme } = useTheme();
  const themeClass = theme ? 'dark-theme' : 'light-theme';
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await getUserLogged();
      if (!response.error) {
        setUser(response.data);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.setItem('isLoggedIn', 'false');
    navigate('/');
  };

  return (
    <button
      id='logout'
      onClick={handleLogout}
      className={themeClass}>{user ? `Logout (${user.name})` : intext}</button>
  );
}

export default LogoutButton;

LogoutButton.propTypes = {
  intext: PropTypes.string
};
