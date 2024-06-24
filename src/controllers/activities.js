const activitiesRouter = require('express').Router()
const activitiesModel = require('../models/activities')
const multer = require('multer')
const { authenticateToken } = require('../utils/middleware')

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

activitiesRouter.post('/', authenticateToken, upload.array('files'), async (req, res) => {
    try {
        const { SubjectID, Title, files, Description, Deadline } = req.body;

        if (!Title || !Description || !files || !Deadline) {
            return res.status(400).json({ error: 'Title, Description, Files, and Deadline are required' });
        }

        if (req.user.role !== 'Admin' && req.user.role !== 'Teacher') {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        const insertedActivity = await activitiesModel.createActivity(SubjectID, Title, Description, files, Deadline);
        res.status(201).json(insertedActivity);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

activitiesRouter.get('/', async (req, res) => {
    try {
        const activities = await activitiesModel.getAllActivities()
        res.status(200).json(activities)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});

activitiesRouter.get('/:id', async (req, res) => {
    const id = Number(req.params.id)
    try {
        const activities = await activitiesModel.getActivitiesByActivityID(id)
        if (!activities) {
            return res.status(404).json({ error: 'Activity not found' })
        }
        res.status(200).json(activities)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});

activitiesRouter.get('/subject/:id', async (req, res) => {
    try {
        const id = Number(req.params.id)
        const activities = await activitiesModel.getActivitiesBySubjectID(id)
        res.status(200).json(activities)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});

activitiesRouter.put('/:id', authenticateToken, upload.array('files'), async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { SubjectID, Title, files, Description, Deadline } = req.body;

        if (!Title || !Description || !files || !Deadline) {
            return res.status(400).json({ error: 'Title, Description, Files, and Deadline are required' });
        }

        await activitiesModel.updateActivity(id, SubjectID, Title, Description, files, Deadline);
        res.status(204).end();
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

activitiesRouter.delete('/:id', async (req, res) => {
    const id = Number(req.params.id);
    try {
        await activitiesModel.deleteActivity(id)
        res.status(204).end()
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});

module.exports = activitiesRouter;
