const gradesRouter = require('express').Router()
const gradesModel = require('../models/grades');
const { authenticateToken } = require('../utils/middleware');

gradesRouter.post('/', authenticateToken, async (req, res) => {
    try {
        const { SubjectID, Score, UserID, ActivityID } = req.body

        if (!SubjectID || !Score || !UserID || !ActivityID) {
            return res.status(400).json({ error: 'SubjectID, Score, UserID, and ActivityID are required' })
        }

        if (req.user.role !== 'Admin' && req.user.role !== 'Teacher') {
            return res.status(403).json({ error: 'Unauthorized' })
        }
 
        const insertedGrade = await gradesModel.createGrade(UserID, SubjectID, ActivityID, Score)
        res.status(201).json(insertedGrade)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});

gradesRouter.get('/', async (req, res) => {
    try {
        const grades = await gradesModel.getAllGrades()
        res.status(200).json(grades)
    } catch (err) {
        res.status(500).send({ error: err.message })
    }
});

gradesRouter.get('/:id', async (req, res) => {
    const id = Number(req.params.id)
    try {
        const grades = await gradesModel.getGradesByGradeID(id)
        if (!grades) {
            return res.status(404).json({ error: 'Grade not found' })
        }
        res.status(200).json(grades)
    } catch (err) {
        res.status(500).send({ error: err.message })
    }
});

gradesRouter.put('/:id', async (req, res) => {
    const id = Number(req.params.id)
    const { SubjectID, Score, UserID, ActivityID } = req.body

    if (!SubjectID || !Score || !UserID || !ActivityID) {
        return res.status(400).json({ error: 'SubjectID, Score, UserID, and ActivityID are required' })
    }

    try {
        const updatedGrade = await gradesModel.updateGrade(UserID, SubjectID, ActivityID, Score, id)
        if (!updatedGrade) {
            return res.status(404).json({ error: 'Grade not found' })
        }
        res.status(200).json(updatedGrade)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});

gradesRouter.delete('/:id', async (req, res) => {
    const id = Number(req.params.id)
    try {
        await gradesModel.deleteGrade(id)
        res.status(204).end()
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});

module.exports = gradesRouter;
