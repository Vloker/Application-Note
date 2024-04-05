import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '../../context/context';
import './../../styles/button.css';

function Button({ text, onclick, type }) {
  const { theme } = useTheme();
  const themeClass = theme ? 'dark-theme' : 'light-theme';

  return (
    <button
      id='buttonsAction'
      className={themeClass}
      type={type}
      onClick={onclick}>
      {text}
    </button>
  );
}

export default Button;

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onclick: PropTypes.func.isRequired,
  type: PropTypes.string
};
