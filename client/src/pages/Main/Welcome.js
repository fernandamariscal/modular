import React, { useState, useEffect } from 'react';
import './Welcome.css';
import MenuForms from './MenuForms/MenuForms';
import Inicio from './Inicio';

const Welcome = () => {
    const [user, setUser] = useState({ Nombres: 'Usuario', Apellidos: '', _id: '' }); // Asegurarse de incluir _id en el estado
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const [showInicio, setShowInicio] = useState(true);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user')) || {};
        setUser(userData);

        const checkInitialForm = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/forms/initial/check/${userData._id}`);
                const result = await response.json();

                if (result.hasInitial) {
                    setShowInicio(false);
                }
            } catch (error) {
                console.error('Error checking initial form:', error);
            }
        };

        checkInitialForm();

        // Simula un retardo para mostrar el contenido (por ejemplo, después de una animación de carga)
        setTimeout(() => {
            setShowContent(true);
        }, 500);       
    }, []);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleCloseInicio = () => {
        setShowInicio(false);
    };

    return (
        <div className={`welcome template d-flex justify-content-center align-items-center vh-100 ${showInicio ? 'blur-background' : ''}`}>
            {showInicio && <Inicio onClose={handleCloseInicio} user={user} />}
            <div className='black-bar'></div>
            <div className='menu-icon' onClick={toggleSidebar}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className={`blue-sidebar ${sidebarOpen ? 'open' : ''}`}></div>
            <div className={`welcome-message ${showContent ? 'show' : ''}`}>
                <h1>Bienvenido, {user.Nombres} {user.Apellidos}</h1>
            </div>
            <div className={`menu-form-container ${showContent ? 'show' : ''}`}>
                <MenuForms userId={user._id} /> {/* Pasar el ID del usuario como prop */}
            </div>
        </div>
    );
};

export default Welcome;
