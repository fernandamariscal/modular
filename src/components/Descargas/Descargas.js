import React from 'react'
import './Descargas.css'
import { assets } from '../../assets/assets'
const Descargas = () => {
  return (
    <div className='app-download' id='app-dpwnload'>
      <p>Para una mejor experiencia <br />FinanTec App</p>
      <div className="app-download-plataforms">
        <img src={assets.play_store} alt="" />
        <img src={assets.app_store} alt="" />
      </div>
    </div>
  )
}

export default Descargas