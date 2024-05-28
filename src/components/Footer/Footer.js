import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>fsdfsdfsdfsdfsdfsndfjsndfsjkdfsjhdfsjdhf. sjkdhfsjkdhfskdfhsjdhfsjkdfhsjdfnsdcbsjdbfsj. hdfbsndfbsjdfsd</p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANIA</h2>
          <ul>
            <li>Bienvenida</li>
            <li>Nosotros</li>
            <li>Plantillas</li>
            <li>Politicas de privacidad</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>CONTACTANOS</h2>
          <ul>
            <li>+52 800-000-29</li>
            <li>finantec@finanzas.com</li>
          </ul>
        </div>
      </div>
      <hr/>
      <p className="footer-copyright">Copyright 2024 FinanzasTec.com</p>
    </div>
  )
}

export default Footer
