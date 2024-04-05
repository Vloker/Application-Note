// FormRegis.jsx
import React, { useState } from 'react'
import Inputan from '../inputan/Inputan'
import Button from '../button/Button'
import { useTheme } from '../../context/context'
import { register } from '../../utils/network'
import './../../styles/formRegis.css'

function FormRegis() {
    const { theme } = useTheme()
    const themeClass = theme ? 'dark-theme' : 'light-theme'

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
    
        const registrationData = {
            name: username,
            email: email,
            password: password
        };
    
        const response = await register(registrationData)
    
        if (!response.error) {
            alert("Registration successful!");
            setUsername('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        } else {
            if (response.error.message === "Email sudah terdaftar") { // Menggunakan pesan kesalahan yang dikembalikan oleh server
                alert("Email sudah terdaftar. Silakan gunakan email lain.");
            } else {
                alert("Registration failed. Please try again.");
            }
        }
    };

    return (
        <>
            <form id='formRegis' className={themeClass}>
                <div className='inputanRegis'>
                    <Inputan
                        label={"Username"}
                        value={username}
                        type="text"
                        onchange={(e) => setUsername(e.target.value)}
                    />
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
                    <Inputan
                        label={"Confirm Password"}
                        type="password"
                        value={confirmPassword}
                        onchange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <Button
                    text="Register"
                    type={"submit"}
                    onclick={handleRegister}
                />
            </form>
        </>
    )
}

export default FormRegis
