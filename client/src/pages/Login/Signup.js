import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link, useNavigate } from "react-router-dom";
import './style.css'; // Importa los estilos CSS

const Signup = () => {
    const [formData, setFormData] = useState({
        Nombres: '',
        Apellidos: '',
        Correo: '',
        Fecha_nacimiento: new Date(),
        Password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleDateChange = (date) => {
        setFormData({ ...formData, Fecha_nacimiento: date });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedDate = formData.Fecha_nacimiento.toISOString().split('T')[0];
        const data = { ...formData, Fecha_nacimiento: formattedDate };

        try {
            const response = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const responseText = await response.json();
                alert(responseText.message);
                navigate('/form');
            } else {
                console.error('Error al registrar usuario:', response.status, response.statusText);
                alert('Error al registrar usuario');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al registrar usuario');
        }
    };

    return (
        <div className='signup template d-flex justify-content-center align-items-center vh-100 bg-custom'>
            <div className='signup-form form_container'>
                <img src='finantec.png' alt="Logo" className="login-logo mb-4" />
                <form onSubmit={handleSubmit} className='d-flex flex-column'>
                    <h3 className='mb-3 text-center w-100'>Sign Up</h3>
                    <div className='flex-container mb-3 w-100'>
                        <div className='mb-2'>
                            <label htmlFor="Nombres">First Name</label>
                            <input type="text" name="Nombres" placeholder='Enter First Name' className='form-control' onChange={handleChange} />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor="Apellidos">Last Name</label>
                            <input type="text" name="Apellidos" placeholder='Enter Last Name' className='form-control' onChange={handleChange} />
                        </div>
                    </div>
                    <div className='mb-3 w-100'>
                        <label htmlFor="Fecha_nacimiento">Date of Birth</label>
                        <br />
                        <DatePicker
                            selected={formData.Fecha_nacimiento}
                            onChange={handleDateChange}
                            dateFormat="dd/MM/yyyy"
                            className='form-control'
                            required
                        />
                    </div>
                    <div className='mb-3 w-100'>
                        <label htmlFor="Correo">Email</label>
                        <input type="email" name="Correo" placeholder='Enter Email' className='form-control' onChange={handleChange} />
                    </div>
                    <div className='mb-3 w-100'>
                        <label htmlFor="Password">Password</label>
                        <input type="password" name="Password" placeholder='Enter Password' className='form-control' onChange={handleChange} />
                    </div>
                    <div className='d-flex justify-content-center mt-2 w-100'>
                        <button type="submit" className='btn btn-primary'>Sign Up</button>
                    </div>

                    <p className='text-end mt-2'>
                        Already Registered <Link to="/login" className='ms-2'>Sign In</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;