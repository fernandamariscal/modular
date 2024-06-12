import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './style.css';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = formData;

        try {
            const response = await fetch('https://finanzapp9.000webhostapp.com/login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    email,
                    password,
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            if (data.success) {
                localStorage.setItem('user', JSON.stringify(data.user));
                navigate('/welcome');
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            alert('Error al iniciar sesión');
        }
    };

    return (
        <div className='login template d-flex justify-content-center align-items-center vh-100 bg-custom'>
            <div className='form_container p-5 rounded bg-white w-50'>
                <img src = 'finantec.png' alt = "Logo" className="login-logo mb-4"/>
                <form onSubmit={handleSubmit}>
                    <h3 className='text-center'>Sign In</h3>
                    <div className='mb-2'>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder='Enter Email'
                            className='form-control'
                            onChange={handleChange}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder='Enter Password'
                            className='form-control'
                            onChange={handleChange}
                        />
                    </div>
                    <div className='mb-2'>
                        <input type="checkbox" className='custom-checkbox custom-checkbox' id="check" />
                        <label htmlFor="check" className='custom-input-label ms-2'>
                            Remember me
                        </label>
                    </div>
                    <div className='d-grid'>
                        <button className='btn btn-primary'>Sign In</button>
                    </div>
                    <p className='text-end mt-2'>
                        Forgot <a href="">Password?</a><Link to="/signup" className='ms-2'>Sign Up</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;
