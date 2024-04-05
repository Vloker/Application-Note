import React from 'react'
import Header from '../component/header/Header'
import FormRegis from '../component/form/FormRegis'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/context'
import './../styles/register.css'

function Register() {
  const { theme } = useTheme();
  const themeClass = theme ? 'dark-theme' : 'light-theme';
  return (
    <div id='Registrasi' className={themeClass}>
      <Header
        title={"Register Aplikasi Catatan"}/>
      <div className='sectionRegis'>
        <h2 >Isi form ini untuk mendaftar akun</h2>
        <FormRegis/>
        <p >Sudah punya akun? <Link to='/'>Login disini</Link></p>
      </div>
    </div>
  )
}

export default Register