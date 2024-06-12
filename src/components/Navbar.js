import React, { useState } from 'react'
import './Navbar.css'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {

  
    const [menu, setMenu] = useState("Nosotros");

    const navigate = useNavigate();

    const handleButtonClick = () => {
      navigate('/login');
    };


  return (
    <div className='navbar'>
        <img src={assets.logo} alt="" className="logo"/>
        <ul className="navbar-menu">
            <Link to='/' onClick={()=>setMenu("Bienvenida")} className={menu==="Bienvenida"?"active":""}>Bienvenida</Link>
            <a href='#explore-menu' onClick={()=>setMenu("Recursos")} className={menu==="Recursos"?"active":""}>Recursos</a>
            <a href='#app-download' onClick={()=>setMenu("Plantillas")} className={menu==="Plantillas"?"active":""}>Plantillas</a>
            <a href='#footer' onClick={()=>setMenu("Contacto")} className={menu==="Contacto"?"active":""}>Contacto</a>
        </ul>
        <div className="navbar-right">
            <img src={assets.search_icon} alt="" />
            <button onClick = {handleButtonClick}>sign in</button>
        </div>
    </div>
  )
}

export default Navbar