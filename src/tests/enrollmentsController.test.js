const { test, describe, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert');
const supertest = require('supertest');
const enrollmentsModel = require('../models/enrollments');
const db = require('../utils/db');
const app = require('../app');

const api = supertest(app);

describe('tests for enrollments controller', () => {
    beforeEach(async () => {

        const enrollment = {
            UserID: 1,
            SubjectID: 1,
            Role: 'student'
        };

        await db.run('INSERT INTO Enrollments (UserID, SubjectID, Role) VALUES (?, ?, ?)', [enrollment.UserID, enrollment.SubjectID, enrollment.Role]);
    });

    test('create a new enrollment', async () => {
        const newEnrollment = {
            UserID: 1,
            SubjectID: 1,
            Role: 'student'
        };

        await api
            .post('/api/cv/enrollments')
            .send(newEnrollment)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        const lastEnrollment = (await enrollmentsModel.getAllEnrollments()).slice(-1)[0];

        assert.strictEqual(lastEnrollment.UserID, newEnrollment.UserID);
        assert.strictEqual(lastEnrollment.SubjectID, newEnrollment.SubjectID);
        assert.strictEqual(lastEnrollment.Role, newEnrollment.Role);

    });

    test('get all enrollments', async () => {
        const response = await api
            .get('/api/cv/enrollments')
            .expect(200)
            .expect('Content-Type', /application\/json/);

        assert.strictEqual(response.body.length, 1);
    });


    afterEach(async () => {
        await db.run('DELETE FROM Enrollments');
    });
});
