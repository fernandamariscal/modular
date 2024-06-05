import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Bienvenida from './pages/Bienvenida/Bienvenida'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'

const App = () => {
  return (
    <>
      <div className='app'>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Bienvenida/>}/>
          <Route path='/order' element={<PlaceOrder/>}/>
        </Routes>
      </div>
      <Footer/>
    </>
  )
}

export default App