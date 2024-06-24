const { test, describe, beforeEach, afterEach } = require('node:test')
const assert = require('node:assert');
const supertest = require('supertest');
const usersModel = require('../models/users');
const db = require('../utils/db');
const app = require('../app');

const api = supertest(app);

describe('Tests for users controller', () => {
    beforeEach(async () => {
        const user = {
            Name: "Test User",
            Username: "testuser",
            Password: "testpassword",
            Email: "test@example.com",
            Role: "admin"
        };


        await db.run('INSERT INTO Users (Name, Username, Password, Email, Role) VALUES (?, ?, ?, ?, ?)', [user.Name, user.Username, user.Password, user.Email, user.Role]);
    });

    test('create a new user', async () => {
        const user = {
            Name: "Test User",
            Username: "testuser",
            Password: "testpassword",
            Email: "test@example.com",
            Role: "admin"
        };

        await api
            .post('/api/cv/users')
            .send(user)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const lastUser = (await usersModel.getAllUsers()).slice(-1)[0];

        assert.strictEqual(lastUser.Name, user.Name);
        assert.strictEqual(lastUser.Username, user.Username);
        assert.strictEqual(lastUser.Email, user.Email);
        assert.strictEqual(lastUser.Role, user.Role);
    });

    test('get user by ID', async () => {
        const users = await usersModel.getAllUsers();
        const user = users[0];

        const response = await api
            .get(`/api/cv/users/${user.UserID}`)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        assert.strictEqual(response.body.Name, user.Name);
        assert.strictEqual(response.body.Username, user.Username);
        assert.strictEqual(response.body.Email, user.Email);
        assert.strictEqual(response.body.Role, user.Role);
    });

    test('update user', async () => {
        const user = (await usersModel.getAllUsers())[0];

        const updatedUser = {
            Name: "Updated Name",
            Username: "updatedusername",
            Password: "updatedpassword",
            Email: "updated@example.com",
            Role: "teacher"
        };

        await api
            .put(`/api/cv/users/${user.UserID}`)
            .send(updatedUser)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        const newUser = (await usersModel.getAllUsers())[0];

        assert.strictEqual(newUser.Name, updatedUser.Name);
        assert.strictEqual(newUser.Username, updatedUser.Username);
        assert.strictEqual(newUser.Email, updatedUser.Email);
        assert.strictEqual(newUser.Role, updatedUser.Role);
    });

    test('delete user', async () => {
        const user = (await usersModel.getAllUsers())[0];

        await api
            .delete(`/api/cv/users/${user.UserID}`)
            .expect(204);

        const users = await usersModel.getAllUsers();

        assert.strictEqual(users.length, 0);
    });

    afterEach(async () => {
        await db.run('DELETE FROM Users');
    });
})
