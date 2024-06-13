// Importación de React y useState para manejar el estado local del menú
import React, { useState } from 'react'
import './Navbar.css'

// Importación de recursos gráficos desde el archivo assets.js
import { assets } from '../assets/assets'

// Importación de Link y useNavigate desde 'react-router-dom' para la navegación entre páginas
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// Definición del componente funcional Navbar
const Navbar = () => {

    // Estado local para controlar el menú activo
    const [menu, setMenu] = useState("Nosotros");

    // Hook de navegación para redirigir a la página de inicio de sesión
    const navigate = useNavigate();

    // Función para manejar el clic en el botón de inicio de sesión
    const handleButtonClick = () => {
      navigate('/login'); // Redirige a la página de inicio de sesión
    };

  return (
    // Contenedor principal del componente, con clase 'navbar'
    <div className='navbar'>
        {/* Logo de la empresa */}
        <img src={assets.logo} alt="" className="logo"/>
        {/* Lista de elementos del menú de navegación */}
        <ul className="navbar-menu">
<<<<<<< HEAD
            {/* Enlace a la página de inicio, con clase 'active' si es la página actual */}
            <Link to='/' onClick={() => setMenu("Bienvenida")} className={menu === "Bienvenida" ? "active" : ""}>Bienvenida</Link>
            {/* Enlace a la sección de recursos, con clase 'active' si es la página actual */}
            <a href='#explore-menu' onClick={() => setMenu("Recursos")} className={menu === "Recursos" ? "active" : ""}>Recursos</a>
            {/* Enlace a la sección de plantillas, con clase 'active' si es la página actual */}
            <a href='#app-download' onClick={() => setMenu("Plantillas")} className={menu === "Plantillas" ? "active" : ""}>plantillas</a>
            {/* Enlace a la sección de contacto, con clase 'active' si es la página actual */}
            <a href='#footer' onClick={() => setMenu("Contacto")} className={menu === "Contacto" ? "active" : ""}>Contacto</a>
=======
            <Link to='/' onClick={()=>setMenu("Bienvenida")} className={menu==="Bienvenida"?"active":""}>Bienvenida</Link>
            <a href='#explore-menu' onClick={()=>setMenu("Recursos")} className={menu==="Recursos"?"active":""}>Recursos</a>
            <a href='#app-download' onClick={()=>setMenu("Plantillas")} className={menu==="Plantillas"?"active":""}>Plantillas</a>
            <a href='#footer' onClick={()=>setMenu("Contacto")} className={menu==="Contacto"?"active":""}>Contacto</a>
>>>>>>> ccb39b9d7d1a016b5059bfa4d1d817e3d321586e
        </ul>
        {/* Sección derecha del navbar */}
        <div className="navbar-right">
            {/* Icono de búsqueda */}
            <img src={assets.search_icon} alt="" />
            {/* Botón de inicio de sesión */}
            <button onClick={handleButtonClick}>sign in</button>
        </div>
    </div>
  )
}

// Exportación del componente Navbar para su uso en otros archivos
export default Navbar
