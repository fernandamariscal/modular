<<<<<<< HEAD
import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Bienvenida from './pages/Bienvenida/Bienvenida'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import Login from './pages/Login/Login'
import Signup from './pages/Login/Signup'
import Form from './pages/Form/Form'
import 'bootstrap/dist/css/bootstrap.min.css'

const App = () => {
  return (
    <>
      <div className='app'>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Bienvenida/>}/>
          <Route path='/order' element={<PlaceOrder/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/form' element={<Form/>}/>
        </Routes>
      </div>
      <Footer/>
    </>
  )
}

=======
// App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import Bienvenida from './pages/Bienvenida/Bienvenida';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Login from './pages/Login/Login';
import Signup from './pages/Login/Signup';
import Welcome from './pages/Main/Welcome';
import Form from './pages/Form/Form'
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Routes>
      {/* Rutas que usan el MainLayout */}
      <Route element={<MainLayout />}>
        <Route path='/' element={<Bienvenida />} />
        <Route path='/Cart' element={<Cart />} />
        <Route path='/order' element={<PlaceOrder />} />
      </Route>

      {/* Rutas que usan el AuthLayout */}
      <Route element={<AuthLayout />}>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/welcome' element={<Welcome />} />
        <Route path='/form' element={<Form/>}/>
      </Route>
    </Routes>
  );
};

>>>>>>> ccb39b9d7d1a016b5059bfa4d1d817e3d321586e
export default App;
