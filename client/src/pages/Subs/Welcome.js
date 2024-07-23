import React, { useState, useEffect } from 'react';
import './Welcome.css';
import MenuForms from './MenuForms/MenuForms';
import Inicio from './Inicio';
import Ahorro from '../Subs/Ahorro';
import Jubilacion from '../Subs/Jubilacion';
import Metas from '../Subs/Metas';
import Gastos from '../Subs/Gastos';

const Welcome = () => {
    // ... Código de estado y efectos

    return (
        <div className={`welcome ${showInicio ? 'blur-background' : ''}`}>
            {showInicio && <Inicio onClose={handleCloseInicio} user={user} />}
            <div className={`black-bar ${isFormSelected ? 'hidden' : ''}`}>
                <div className="menu-icon" onClick={toggleSidebar}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <i className="bi bi-person user-icon" onClick={toggleUserMenu}></i>
                {userMenuOpen && (
                    <div className="user-menu">
                        <div className="user-menu-item">
                            <i className="bi bi-house-door"></i> My Content
                        </div>
                        <div className="user-menu-item">
                            <i className="bi bi-person-circle"></i> Profile
                        </div>
                        <div className="user-menu-item">
                            <i className="bi bi-box-arrow-right"></i> Log Out
                        </div>
                    </div>
                )}
            </div>
            <div className={`blue-sidebar ${sidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-options">
                    <div className="sidebar-item" onClick={() => selectForm('save')} aria-label="Generar Ahorro">
                        <i className="bi bi-piggy-bank icon" aria-hidden="true"></i>
                        Generar Ahorro
                    </div>
                    <div className="sidebar-item" onClick={() => selectForm('retirement')} aria-label="Plan de Jubilación">
                        <i className="bi bi-building icon" aria-hidden="true"></i>
                        Plan de Jubilación
                    </div>
                    <div className="sidebar-item" onClick={() => selectForm('goal')} aria-label="Metas Largo/Corto Plazo">
                        <i className="bi bi-target icon" aria-hidden="true"></i>
                        Metas Largo/Corto Plazo
                    </div>
                    <div className="sidebar-item" onClick={() => selectForm('gastos')} aria-label="Gastos">
                        <i className="bi bi-wallet icon" aria-hidden="true"></i>
                        Gastos
                    </div>
                    <div className={`sidebar-item close-sidebar ${isFormSelected ? '' : 'hidden'}`} onClick={handleCloseSidebar} aria-label="Cerrar">
                        <i className="bi bi-arrow-left-circle icon" aria-hidden="true"></i>
                        Volver
                    </div>
                </div>
            </div>
            <div className={`menu-form-container ${showContent ? 'show' : ''}`}>
                {!isFormSelected && <MenuForms userId={user._id} selectedForm={selectedForm} />}
                {selectedForm === 'save' && <Ahorro />}
                {selectedForm === 'retirement' && <Jubilacion />}
                {selectedForm === 'goal' && <Metas />}
                {selectedForm === 'gastos' && <Gastos />}
            </div>
            <div className={`welcome-message ${showContent && !isFormSelected ? 'show' : ''}`}>
                <h1>Bienvenido, {user.Nombres} {user.Apellidos}</h1>
            </div>
        </div>
    );
};

export default Welcome;
