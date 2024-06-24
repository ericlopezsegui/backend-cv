const { test, describe, beforeEach, afterEach } = require('node:test')
const assert = require('node:assert');
const supertest = require('supertest');
const requestsModel = require('../models/requests');
const db = require('../utils/db');
const app = require('../app');

const api = supertest(app);

describe('Tests for requests controller', () => {
    beforeEach(async () => {
        const request = {
            UserID: 1,
            SubjectID: 1,
            request_time: "2022-04-20 10:00:00",
            status: "Pending"
        };

        await db.run('INSERT INTO Request (UserID, SubjectID, request_time, status) VALUES (?, ?, ?, ?)', [request.UserID, request.SubjectID, request.request_time, request.status]);
    });

    test('create a new request', async () => {
        const request = {
            UserID: 2,
            SubjectID: 2,
            request_time: "2022-04-21 11:00:00",
            status: "Pending"
        };

        await api
            .post('/api/cv/requests')
            .send(request)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const lastRequest = (await requestsModel.getAllRequests()).slice(-1)[0];

        assert.strictEqual(lastRequest.UserID, request.UserID);
        assert.strictEqual(lastRequest.SubjectID, request.SubjectID);
        assert.strictEqual(lastRequest.request_time, request.request_time);
        assert.strictEqual(lastRequest.status, request.status);
    });

    test('get request by ID', async () => {
        const requests = await requestsModel.getAllRequests();
        const request = requests[0];

        const response = await api
            .get(`/api/cv/requests/${request.RequestID}`)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        assert.strictEqual(response.body.UserID, request.UserID);
        assert.strictEqual(response.body.SubjectID, request.SubjectID);
        assert.strictEqual(response.body.request_time, request.request_time);
        assert.strictEqual(response.body.status, request.status);
    });

    test('update request', async () => {
        const request = (await requestsModel.getAllRequests())[0];

        const updatedRequest = {
            UserID: 3,
            SubjectID: 3,
            request_time: "2022-04-22 12:00:00",
            status: "Approved"
        };

        await api
            .put(`/api/cv/requests/${request.RequestID}`)
            .send(updatedRequest)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        const newRequest = (await requestsModel.getAllRequests())[0];

        assert.strictEqual(newRequest.UserID, updatedRequest.UserID);
        assert.strictEqual(newRequest.SubjectID, updatedRequest.SubjectID);
        assert.strictEqual(newRequest.request_time, updatedRequest.request_time);
        assert.strictEqual(newRequest.status, updatedRequest.status);
    });

    test('delete request', async () => {
        const request = (await requestsModel.getAllRequests())[0];

        await api
            .delete(`/api/cv/requests/${request.RequestID}`)
            .expect(204);

        const requests = await requestsModel.getAllRequests();

        assert.strictEqual(requests.length, 0);
    });

    afterEach(async () => {
        await db.run('DELETE FROM Request');
    });
})
