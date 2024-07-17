const express = require('express');
const router = express.Router();
const Initial = require('../models/Initial'); // Importa el modelo Initial
const Goal = require('../models/Goal');
const Save = require('../models/Save');
const Retire = require('../models/Retire');

// Ruta para guardar el formulario inicial
router.post('/initial', async (req, res) => {
    const { userId, salary, paysServices, monthlyExpenses } = req.body;

    if (!userId || !salary || !paysServices || !monthlyExpenses) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newInitial = new Initial({
            userId,
            salary,
            paysServices,
            monthlyExpenses
        });

        const savedInitial = await newInitial.save();
        res.status(201).json({ message: 'Formulario inicial guardado exitosamente', data: savedInitial });
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// Ruta para verificar si el usuario ya tiene un formulario inicial
router.get('/initial/check/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const initialEntry = await Initial.findOne({ userId });
        if (initialEntry) {
            res.status(200).json({ hasInitial: true });
        } else {
            res.status(200).json({ hasInitial: false });
        }
    } catch (error) {
        console.error('Error checking initial form:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Ruta para guardar una nueva meta
router.post('/goals', async (req, res) => {
    const { userId, shortTerm, mediumTerm, longTerm, monthlyBudget, goalType } = req.body;

    try {
        const newGoal = new Goal({
            userId,
            shortTerm,
            mediumTerm,
            longTerm,
            monthlyBudget,
            goalType
        });

        await newGoal.save();
        res.status(201).json({ message: 'Goal saved successfully' });
    } catch (error) {
        console.error('Error saving goal:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//Ruta para guardar formulario de ahorro

router.post('/Save', async (req, res) => {
    const { userId, hasSpecificGoal, targetAmount, weeklySavings } = req.body;

    try {
        const newSave = new Save({
            userId,
            hasSpecificGoal,
            targetAmount,
            weeklySavings
        });

        const savedSave = await newSave.save();
        res.status(201).json(savedSave);
    } catch (error) {
        console.error('Error saving save data:', error);
        res.status(500).json({ message: 'Error saving save data', error });
    }
});

//Ruta para registrar formulario de plan de jubilacion
router.post('/retires', async (req, res) => {
    try {
        const { userId, retirementPlan, spenderPerson } = req.body;
        const newRetire = new Retire({ userId, retirementPlan, spenderPerson });
        await newRetire.save();
        res.status(201).json(newRetire);
    } catch (error) {
        console.error('Error saving retire data:', error);
        res.status(500).json({ error: 'Error saving retire data' });
    }
});





module.exports = router;
