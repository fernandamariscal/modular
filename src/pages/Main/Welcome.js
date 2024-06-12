import React from 'react';

const Welcome = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div className='welcome template d-flex justify-content-center align-items-center vh-100 bg-custom2'>
                <h1>Bienvenido, {user.Nombres} {user.Apellidos}</h1>
        </div>
    );
}

export default Welcome;
