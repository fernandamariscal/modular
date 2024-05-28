import React, { useState } from 'react'
import './Bienvenida.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import Descargas from '../../components/Descargas/Descargas'

const Bienvenida = () => {

    const [category, setCategory] = useState("All");


  return (
    <div>
      <Header/>
      <ExploreMenu category={category} setCategory={setCategory}/>
      <Descargas/>
    </div>
  )
}

export default Bienvenida