import React from 'react';
import Header from '../component/header/Header';
import Formlogin from '../component/form/FormLogin';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/context'; // Menggunakan useTheme dari context/Theme.js
import './../styles/login.css';

function Login() {
  const { theme } = useTheme(); // Menggunakan useTheme dari context/Theme.js
  const themeClass = theme ? 'dark-theme' : 'light-theme';

  return (
    <div 
      id='login'
      className={themeClass}>
      <Header title={"Aplikasi Catatan"} />
      <div className='sectionLogin'>
        <h2>Silahkan login untuk menggunakan aplikasi ini</h2>
        <Formlogin />
        <p>Belum punya akun? <Link to='/register'>Daftar</Link></p>
      </div>
    </div>
  );
}

export default Login;
