const subjectsRouter = require('express').Router()
const subjectsModel = require('../models/subjects');
const { authenticateToken } = require('../utils/middleware');

subjectsRouter.post('/', authenticateToken, async (req, res) => {
    try {
        const { Name, Year, Description, Status } = req.body

        if (!Name || !Year || !Description || !Status) {
            return res.status(400).json({ error: 'Name, Year, Description, and Status are required' })
        }

        if (req.user.role !== 'Admin') {
            return res.status(403).json({ error: 'Only an admin can create a subject' })
        }

        const insertedSubject = await subjectsModel.createSubject(Name, Year, Description, Status)
        res.status(201).json(insertedSubject)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});

subjectsRouter.get('/', async (req, res) => {
    try {
        const subjects = await subjectsModel.getAllSubjects()
        res.status(200).json(subjects)
    } catch (err) {
        res.status(500).send({ error: err.message })
    }
});

subjectsRouter.get('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id)
        const subjects = await subjectsModel.getSubjectByID(id)
        if (!subjects) {
            return res.status(404).json({ error: 'Subject not found' })
        }
        res.status(200).json(subjects)
    } catch (err) {
        res.status(500).send({ error: err.message })
    }
});

subjectsRouter.put('/:id', async (req, res) => {
    try {    
        const id = Number(req.params.id)
        const { Name, Year, Description, Status } = req.body

        if (!Name || !Year || !Description || !Status) {
            return res.status(400).json({ error: 'Name, Year, Description, and Status are required' })
        }

        const updatedSubject = await subjectsModel.updateSubject(id, Name, Year, Description, Status)
        if (!updatedSubject) {
            return res.status(404).json({ error: 'Subject not found' })
        }
        res.status(200).json(updatedSubject)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});

subjectsRouter.delete('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id)
        await subjectsModel.deleteSubject(id)
        res.status(204).end()
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});

module.exports = subjectsRouter;
