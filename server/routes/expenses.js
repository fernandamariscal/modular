// routes/expenses.js
const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const Service = require('../models/Service');

// Ruta para registrar gastos
router.post('/registerExpense', async (req, res) => {
    try {
        const { userId, expenses } = req.body;

        if (!userId || !expenses || !Array.isArray(expenses)) {
            return res.status(400).json({ message: 'Datos incompletos o incorrectos' });
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

        if (!userId || !services || !Array.isArray(services)) {
            return res.status(400).json({ message: 'Datos incompletos o incorrectos' });
        }

        // Guarda los servicios en la base de datos
        for (const service of services) {
            const newService = new Service({
                userId,
                type: service.type,
                amount: service.amount,
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

module.exports = router;