const requestsRouter = require('express').Router()
const requestsModel = require('../models/requests')

requestsRouter.post('/', async (req, res) => {
    const { UserID, SubjectID, request_time, status } = req.body

    if (!UserID || !SubjectID || !request_time || !status) {
        return res.status(400).json({ error: 'UserID, SubjectID, request_time, and status are required' })
    }

    if (status !== 'Pending' && status !== 'Approved' && status !== 'Denied') {
        return res.status(400).json({ error: 'Invalid status. Status must be one of: Pending, Approved, Denied' })
    }

    try {
        const insertedRequest = await requestsModel.createRequest(UserID, SubjectID, request_time, status)
        res.status(201).json(insertedRequest)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});

requestsRouter.get('/', async (req, res) => {
    try {
        const requests = await requestsModel.getAllRequests();
        res.status(200).json(requests)
    } catch (err) {
        res.status(500).send({ error: err.message })
    }
});

requestsRouter.get('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id)
        const requests = await requestsModel.getRequestsByRequestID(id)
        if (!requests) {
            return res.status(404).json({ error: 'Request not found' })
        }
        res.status(200).json(requests);
    } catch (err) {
        res.status(500).send({ error: err.message })
    }
});

requestsRouter.put('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const {status} = req.body;

        if (!status) {
            return res.status(400).json({ error: 'UserID, SubjectID, request_time, and status are required' });
        }

        if (status !== 'Pending' && status !== 'Approved' && status !== 'Denied') {
            return res.status(400).json({ error: 'Invalid status. Status must be one of: Pending, Approved, Denied' });
        }

        const updatedRequest = await requestsModel.updateRequest({
            RequestID: id,
            status: status
        });

        res.status(200).json(updatedRequest);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

requestsRouter.delete('/:id', async (req, res) => {
    const id = Number(req.params.id)
    try {
        await requestsModel.deleteRequest(id)
        res.status(204).end()
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});

module.exports = requestsRouter;
