const { test, describe, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert');
const supertest = require('supertest');
const gradesModel = require('../models/grades');
const db = require('../utils/db');
const app = require('../app');

const api = supertest(app);

describe('tests for grades controller', () => {
    beforeEach(async () => {

        const grade = {
            SubjectID: 1,
            Score: 90,
            UserID: 1,
            ActivityID: 1
        };

        await db.run('INSERT INTO Grades (SubjectID, Score, UserID, ActivityID) VALUES (?, ?, ?, ?)', [grade.SubjectID, grade.Score, grade.UserID, grade.ActivityID]);
    });

    test('create a new grade', async () => {
        const newGrade = {
            SubjectID: 2,
            Score: 85,
            UserID: 2,
            ActivityID: 2
        };

        await api
            .post('/api/cv/grades')
            .send(newGrade)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        const lastGrade = (await gradesModel.getAllGrades()).slice(-1)[0];

        assert.strictEqual(lastGrade.SubjectID, newGrade.SubjectID);
        assert.strictEqual(lastGrade.Score, newGrade.Score);
        assert.strictEqual(lastGrade.UserID, newGrade.UserID);
        assert.strictEqual(lastGrade.ActivityID, newGrade.ActivityID);

        await db.run('DELETE FROM Grades');
    });

    test('get all grades', async () => {
        const response = await api
            .get('/api/cv/grades')
            .expect(200)
            .expect('Content-Type', /application\/json/);

        assert.strictEqual(response.body.length, 1);
    });


    afterEach(async () => {
        await db.run('DELETE FROM Grades');
    });
});
