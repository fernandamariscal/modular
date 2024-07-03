import React, { useState } from 'react';
import { FaPiggyBank, FaRegCalendarAlt, FaFlagCheckered } from 'react-icons/fa';
import SaveForm from './SaveForm';
import './style.css';

const MenuForm = () => {
    const [isSaveFormOpen, setIsSaveFormOpen] = useState(false);
    const [formType, setFormType] = useState('');

    const openSaveForm = (type) => {
        setFormType(type);
        setIsSaveFormOpen(true);
    };

    const closeSaveForm = () => {
        setIsSaveFormOpen(false);
    };

    return (
        <>
            <div className='saving-boxes'>
                <div className='saving-box green' onClick={() => openSaveForm('save')}>
                    <FaPiggyBank className='icon'/>
                    <span>Generar Ahorro</span>
                </div>
                <div className='saving-box blue' onClick={() => openSaveForm('retirement')}>
                    <FaRegCalendarAlt className='icon'/>
                    <span>Plan Jubilación</span>
                </div>
                <div className='saving-box pink' onClick={() => openSaveForm('goals')}>
                    <FaFlagCheckered className='icon'/>
                    <span>Metas Largo/Corto Plazo</span>
                </div>
            </div>
            <SaveForm isOpen={isSaveFormOpen} onClose={closeSaveForm} formType={formType} />
        </>
    );
}

export default MenuForm;
