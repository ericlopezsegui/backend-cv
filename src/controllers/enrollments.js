const enrollmentsRouter = require('express').Router();
const enrollmentsModel = require('../models/enrollments');
const { authenticateToken } = require('../utils/middleware');

enrollmentsRouter.post('/', authenticateToken, async (req, res) => {
    const enrollment = req.body;
    if (!enrollment.UserID || !enrollment.SubjectID || !enrollment.Role) {
        return res.status(400).json({ error: 'UserID, SubjectID, and Role are required' });
    }

    if (req.user.role !== 'Admin') {
        return res.status(403).json({ error: 'Only an admin can create an enrollment' });
    }

    try {
        const insertedEnrollment = await enrollmentsModel.createEnrollment(enrollment.UserID, enrollment.SubjectID, enrollment.Role);
        res.status(201).json(insertedEnrollment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

enrollmentsRouter.get('/', async (req, res) => {
    try {
        const enrollments = await enrollmentsModel.getAllEnrollments();
        res.status(200).json(enrollments);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

enrollmentsRouter.get('/:id', async (req, res) => {
    const id = Number(req.params.id);
    try {
        const enrollments = await enrollmentsModel.getEnrollmentsByEnrollmentID(id);
        if (!enrollments) {
            return res.status(404).json({ error: 'Enrollment not found' });
        }
        res.status(200).json(enrollments);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

enrollmentsRouter.put('/:id', async (req, res) => {
    const id = Number(req.params.id);
    const enrollment = req.body;

    if (!enrollment.UserID || !enrollment.SubjectID || !enrollment.Role) {
        return res.status(400).json({ error: 'UserID, SubjectID, and Role are required' });
    }

    try {
        const updatedEnrollment = await enrollmentsModel.updateEnrollment(id, enrollment.UserID, enrollment.SubjectID, enrollment.Role);
        if (!updatedEnrollment) {
            return res.status(404).json({ error: 'Enrollment not found' });
        }
        res.status(200).json(updatedEnrollment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

enrollmentsRouter.delete('/:id', async (req, res) => {
    const id = Number(req.params.id);
    try {
        await enrollmentsModel.deleteEnrollment(id);
        res.status(204).end();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = enrollmentsRouter;
