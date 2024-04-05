import React, { useState } from 'react'
import Inputan from '../inputan/Inputan'
import Button from '../button/Button'
import { login, putAccessToken } from '../../utils/network'
import { useNavigate } from 'react-router-dom'; // Import useNavigate and useParams
import './../../styles/formLogin.css'

function Formlogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = {
      email: email,
      password: password
    };

    const response = await login(loginData);

    if (!response.error) {
      putAccessToken(response.data.accessToken);
      alert("Login successful!");
      localStorage.setItem('isLoggedIn', 'true');
      navigate(`/HalamanCatatan`);
    } else {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <>
      <form id='formLogin'>
        <div className='inputanLogin'>
          <Inputan
            label={"Email"}
            type="email"
            value={email}
            onchange={(e) => setEmail(e.target.value)}
          />
          <Inputan
            label={"Password"}
            type="password"
            value={password}
            onchange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button
          type={"submit"}
          text="Login"
          onclick={handleLogin}
        />
      </form>
    </>
  )
}

export default Formlogin
