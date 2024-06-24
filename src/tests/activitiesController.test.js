const { test, describe, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert');
const supertest = require('supertest');
const activitiesModel = require('../models/activities');
const db = require('../utils/db');
const app = require('../app');

const api = supertest(app);

describe('tests for activities controller', () => {
    beforeEach(async () => {

        const activity = {
            SubjectID: 1,
            Title: 'Test Activity',
            Description: 'Test description',
            File: 'test_file.pdf',
            Deadline: '2024-04-30'
        };

        await db.run('INSERT INTO Activities (SubjectID, Title, Description, File, Deadline) VALUES (?, ?, ?, ?, ?)', [activity.SubjectID, activity.Title, activity.Description, activity.File, activity.Deadline]);
    });

    test('create a new activity', async () => {
        const newActivity = {
            SubjectID: 2,
            Title: 'New Activity',
            Description: 'New description',
            File: 'new_file.pdf',
            Deadline: '2024-05-31'
        };

        await api
            .post('/api/cv/activities')
            .send(newActivity)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        const lastActivity = (await activitiesModel.getAllActivities()).slice(-1)[0];

        assert.strictEqual(lastActivity.SubjectID, newActivity.SubjectID);
        assert.strictEqual(lastActivity.Title, newActivity.Title);
        assert.strictEqual(lastActivity.Description, newActivity.Description);
        assert.strictEqual(lastActivity.File, newActivity.File);
        assert.strictEqual(lastActivity.Deadline, newActivity.Deadline);

        await db.run('DELETE FROM Activities');
    });

    test('get all activities', async () => {
        const response = await api
            .get('/api/cv/activities')
            .expect(200)
            .expect('Content-Type', /application\/json/);

        assert.strictEqual(response.body.length, 1);
    });


    afterEach(async () => {
        await db.run('DELETE FROM Activities');
    });
});
