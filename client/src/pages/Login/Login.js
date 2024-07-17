import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
    
            if (!response.ok) {
                const errorResponse = await response.text();
                throw new Error(`Network response was not ok: ${errorResponse}`);
            }
    
            const data = await response.json();
    
            if (data.message === 'Login successful') {
                // Guardar el usuario en localStorage o contexto de sesión
                localStorage.setItem('user', JSON.stringify(data.user));
                // Redirigir a la página de bienvenida
                navigate('/welcome');
            } else {
                alert(data.message); // Mensaje de error del backend
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            alert('Error al iniciar sesión: ' + error.message);
        }
    };
    

    return (
        <div className='login template d-flex justify-content-center align-items-center vh-100 bg-custom'>
            <div className='form_container p-5 rounded bg-white w-50'>
                <img src='finantec.png' alt='Logo' className='login-logo mb-4' />
                <form onSubmit={handleSubmit}>
                    <h3 className='text-center'>Sign In</h3>
                    <div className='mb-2'>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            name='email'
                            placeholder='Enter Email'
                            className='form-control'
                            onChange={handleChange}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            name='password'
                            placeholder='Enter Password'
                            className='form-control'
                            onChange={handleChange}
                        />
                    </div>
                    <div className='mb-2'>
                        <input type='checkbox' className='custom-checkbox custom-checkbox' id='check' />
                        <label htmlFor='check' className='custom-input-label ms-2'>
                            Remember me
                        </label>
                    </div>
                    <div className='d-grid'>
                        <button className='btn btn-primary'>Sign In</button>
                    </div>
                    <p className='text-end mt-2'>
                        Forgot <a href=''>Password?</a>
                        <Link to='/signup' className='ms-2'>
                            Sign Up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
