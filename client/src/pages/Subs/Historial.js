import React, { useState } from 'react';
import './Historial.css';

const Historial = () => {
    const [filterVisible, setFilterVisible] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('');
    const [filterValue, setFilterValue] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [activeTab, setActiveTab] = useState('gastos'); // Estado para la pestaña activa

    const data = [
        { date: '2024-07-01 12:00', name: 'Compra 1', type: 'Comida', cost: '50', category: 'gastos' },
        { date: '2024-07-02 14:30', name: 'Compra 2', type: 'Ropa', cost: '100', category: 'gastos' },
        { date: '2024-07-03 16:45', name: 'Compra 3', type: 'Entretenimiento', cost: '75', category: 'gastos' },
        { date: '2024-07-01 09:00', type: 'Electricidad', frequency: 'Mensual', cost: '120', category: 'pagos' },
        { date: '2024-07-02 11:30', type: 'Agua', frequency: 'Bimestral', cost: '80', category: 'pagos' },
        { date: '2024-07-03 14:00', type: 'Internet', frequency: 'Anual', cost: '300', category: 'pagos' },
        // Agrega más datos según sea necesario
    ];

    const handleFilter = () => {
        const filtered = data.filter(item => {
            // Verifica que `item.name` y otros campos sean definidos antes de aplicar `toLowerCase()`
            const nameMatch = selectedFilter !== 'Nombre' || (item.name && item.name.toLowerCase().includes(filterValue.toLowerCase()));
            const typeMatch = selectedFilter !== 'Tipo' || (item.type && item.type.toLowerCase().includes(filterValue.toLowerCase()));
            const dateMatch = selectedFilter !== 'Fecha' || (item.date && item.date.includes(filterValue));
            const frequencyMatch = selectedFilter !== 'Frecuencia' || (item.frequency && item.frequency.toLowerCase().includes(filterValue.toLowerCase()));
    
            return nameMatch && typeMatch && dateMatch && frequencyMatch && item.category === activeTab;
        });
    
        setFilteredData(filtered);
    };
    

    const toggleFilterVisibility = () => {
        setFilterVisible(!filterVisible);
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setFilteredData(data.filter(item => item.category === tab));
        if (tab === 'pagos') {
            setSelectedFilter(''); // Desactiva el filtro al cambiar de pestaña
        }
    };

    const calculateTotal = () => {
        return (filteredData.length > 0 ? filteredData : data.filter(item => item.category === activeTab))
            .reduce((acc, item) => acc + parseFloat(item.cost), 0)
            .toFixed(2);
    };

    return (
        <div className="historial-container">
            <div className="tabs">
                <button 
                    className={`tab-button ${activeTab === 'gastos' ? 'active' : ''}`} 
                    onClick={() => handleTabChange('gastos')}
                >
                    Historial Gastos
                </button>
                <button 
                    className={`tab-button ${activeTab === 'pagos' ? 'active' : ''}`} 
                    onClick={() => handleTabChange('pagos')}
                >
                    Historial Pagos Servicio
                </button>
                <button className="filter-btn" onClick={toggleFilterVisibility}>
                    <i className="bi bi-sliders"></i>
                </button>
            </div>
            {filterVisible && (
                <div className="filter-options">
                    {activeTab === 'gastos' && !selectedFilter && (
                        <>
                            <button onClick={() => setSelectedFilter('Nombre')}>Filtrar por Nombre</button>
                            <button onClick={() => setSelectedFilter('Tipo')}>Filtrar por Tipo</button>
                            <button onClick={() => setSelectedFilter('Fecha')}>Filtrar por Fecha</button>
                        </>
                    )}
                    {activeTab === 'pagos' && !selectedFilter && (
                        <>
                            <button onClick={() => setSelectedFilter('Tipo')}>Filtrar por Tipo</button>
                            <button onClick={() => setSelectedFilter('Frecuencia')}>Filtrar por Frecuencia</button>
                        </>
                    )}
                    {selectedFilter && (
                        <>
                            <input
                                type="text"
                                placeholder={`Ingrese ${selectedFilter}`}
                                value={filterValue}
                                onChange={(e) => setFilterValue(e.target.value)}
                            />
                            <button onClick={handleFilter}>Aplicar Filtro</button>
                            <button onClick={() => setSelectedFilter('')}>Cancelar</button>
                        </>
                    )}
                </div>
            )}
            <table className="historial-table">
                <thead>
                    <tr>
                        <th>Fecha/Hora</th>
                        {activeTab === 'pagos' ? (
                            <>
                                <th>Tipo</th>
                                <th>Frecuencia</th>
                            </>
                        ) : (
                            <>
                                <th>Nombre</th>
                                <th>Tipo</th>
                            </>
                        )}
                        <th>Costo</th>
                    </tr>
                </thead>
                <tbody>
                    {(filteredData.length > 0 ? filteredData : data.filter(item => item.category === activeTab)).map((item, index) => (
                        <tr key={index}>
                            <td>{item.date}</td>
                            {activeTab === 'pagos' ? (
                                <>
                                    <td>{item.type}</td>
                                    <td>{item.frequency}</td>
                                </>
                            ) : (
                                <>
                                    <td>{item.name}</td>
                                    <td>{item.type}</td>
                                </>
                            )}
                            <td>{item.cost}</td>
                        </tr>
                    ))}
                    <tr className="total-row">
                        <td colSpan={activeTab === 'pagos' ? '4' : '3'}>Total</td>
                        <td>${calculateTotal()}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Historial;
