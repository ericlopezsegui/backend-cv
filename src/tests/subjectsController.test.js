const { test, describe, beforeEach, afterEach } = require('node:test')
const assert = require('node:assert');
const supertest = require('supertest');
const subjectsModel = require('../models/subjects');
const db = require('../utils/db');
const app = require('../app');

const api = supertest(app);

describe('tests for subjects controller', () => {
  beforeEach(async () => {
    const subject = {
      Name: "Test Subject",
      Year: "2022",
      Description: "Test description",
      Status: "active"
    };

    await db.run('INSERT INTO Subject (Name, Year, Description, Status) VALUES (?, ?, ?, ?)', [subject.Name, subject.Year, subject.Description, subject.Status]);
  });

  test('create a new subject', async () => {
    const subject = {
      Name: "Test Subject",
      Year: "2023",
      Description: "New description",
      Status: "active"
    };

    await api
      .post('/api/cv/subjects')
      .send(subject)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const lastSubject = (await subjectsModel.getAllSubjects()).slice(-1)[0];

    assert.strictEqual(lastSubject.Name, subject.Name);
    assert.strictEqual(lastSubject.Year, subject.Year);
    assert.strictEqual(lastSubject.Description, subject.Description);
    assert.strictEqual(lastSubject.Status, subject.Status);

    await db.run('DELETE FROM Subject');
  });

  test('get all subjects', async () => {
    const response = await api
      .get('/api/cv/subjects')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    assert.strictEqual(response.body.length, 1);
  });

  test('get a subject', async () => {
    const subjects = await subjectsModel.getAllSubjects();
    const subject = subjects[0];

    const response = await api
      .get(`/api/cv/subjects/${subject.SubjectID}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    assert.strictEqual(response.body.Name, subject.Name);
    assert.strictEqual(response.body.Year, subject.Year);
    assert.strictEqual(response.body.Description, subject.Description);
    assert.strictEqual(response.body.Status, subject.Status);
  });

  test('update a subject', async () => {
    const subject = (await subjectsModel.getAllSubjects())[0];

    const updatedSubject = {
      Name: "Updated Name",
      Year: "2023",
      Description: "Updated description",
      Status: "inactive"
    };

    await api
      .put(`/api/cv/subjects/${subject.SubjectID}`)
      .send(updatedSubject)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const newSubject = (await subjectsModel.getAllSubjects())[0];

    assert.strictEqual(newSubject.Name, updatedSubject.Name);
    assert.strictEqual(newSubject.Year, updatedSubject.Year);
    assert.strictEqual(newSubject.Description, updatedSubject.Description);
    assert.strictEqual(newSubject.Status, updatedSubject.Status);
  });

  test('delete a subject', async () => {
    const subject = (await subjectsModel.getAllSubjects())[0];

    await api
      .delete(`/api/cv/subjects/${subject.SubjectID}`)
      .expect(204);

    const subjects = await subjectsModel.getAllSubjects();

    assert.strictEqual(subjects.length, 0);
  });

  afterEach(async () => {
    await db.run('DELETE FROM Subject');
  });
})