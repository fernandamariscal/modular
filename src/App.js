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

export default App;
