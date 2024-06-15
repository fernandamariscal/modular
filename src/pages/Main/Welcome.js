import React, { useState, useEffect } from 'react';
import './Welcome.css'; // Asegúrate de importar tu hoja de estilos

const Welcome = () => {
    const [user, setUser] = useState({ Nombres: 'Usuario', Apellidos: '' });
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user')) || {};
        setUser(userData);
    }, []);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className='welcome template d-flex justify-content-center align-items-center vh-100 bg-custom2'>
            <div className='black-bar'></div>
            <div className='menu-icon' onClick={toggleSidebar}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className={`blue-sidebar ${sidebarOpen ? 'open' : ''}`}></div>
            <h1 style={{ marginTop: '100px' }}>Bienvenido, {user.Nombres} {user.Apellidos}</h1>
        </div>
    );
}

export default Welcome;
