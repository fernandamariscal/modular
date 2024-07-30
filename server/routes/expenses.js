const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const Service = require('../models/Service');

// Ruta para registrar gastos
router.post('/registerExpense', async (req, res) => {
    try {
        const { userId, expenses } = req.body;

        // Validación de datos
        if (!userId || !expenses || !Array.isArray(expenses)) {
            return res.status(400).json({ message: 'Datos incompletos o incorrectos' });
        }

        // Validación de cada gasto
        for (const expense of expenses) {
            if (!expense.type || !expense.name || expense.cost === undefined || isNaN(expense.cost)) {
                return res.status(400).json({ message: 'Datos incompletos en uno o más gastos' });
            }
        }

        // Guarda los gastos en la base de datos
        for (const expense of expenses) {
            const newExpense = new Expense({
                userId,
                type: expense.type,
                name: expense.name,
                cost: expense.cost
            });
            await newExpense.save();
        }

        res.status(201).json({ message: 'Gastos registrados exitosamente' });
    } catch (error) {
        console.error('Error al registrar gastos:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// Ruta para registrar servicios (similar a gastos)
router.post('/registerService', async (req, res) => {
    try {
        const { userId, services } = req.body;

        // Validación de datos
        if (!userId || !services || !Array.isArray(services)) {
            return res.status(400).json({ message: 'Datos incompletos o incorrectos' });
        }

        // Validación de cada servicio
        for (const service of services) {
            if (!service.type || service.cost === undefined || isNaN(service.cost) || !service.frequency) {
                return res.status(400).json({ message: 'Datos incompletos en uno o más servicios' });
            }
        }

        // Guarda los servicios en la base de datos
        for (const service of services) {
            const newService = new Service({
                userId,
                type: service.type,
                cost: service.cost,
                frequency: service.frequency
            });
            await newService.save();
        }

        res.status(201).json({ message: 'Servicios registrados exitosamente' });
    } catch (error) {
        console.error('Error al registrar servicios:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

//Ruta para mostrar gastos
router.get('/showExpenses', async (req, res) => {
    const { userId } = req.query;
    try {
        const expenses = await Expense.find({ userId });
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching expenses' });
    }
});

//Ruta para mostrar servicios
router.get('/showServices', async (req, res) => {
    const { userId } = req.query;
    try {
        const services = await Service.find({ userId });
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching services' });
    }
});
module.exports = router;
