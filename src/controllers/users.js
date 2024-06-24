const express = require('express')
const usersRouter = express.Router()
const usersModel = require('../models/users')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { authenticateToken } = require('../utils/middleware')

usersRouter.post('/', authenticateToken, async (req, res) => {
    try {
        if (req.user.role !== 'Admin') {
            return res.status(403).json({ error: "Unauthorised" })
        }

        const { Name, Username, Password, Email, Role } = req.body
        if (!Name || !Username || !Password || !Email || !Role) {
            return res.status(400).json({ error: 'Name, Username, Password, Email, and Role are required' })
        }

        const hashedPassword = await bcrypt.hash(Password, 10)
        const newUser = await usersModel.createUser(Username, Name, Email, hashedPassword, Role)
        res.status(201).json(newUser)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

usersRouter.post('/login', async (req, res) => {
    try {
        const { Username, Password } = req.body
        if (!Username || !Password) {
            return res.status(400).json({ error: 'Username and Password are required' })
        }

        const user = await usersModel.getUserByUsername(Username)
        if (!user) {
            return res.status(401).json({ error: 'Invalid Username' })
        }

        const passwordMatch = await bcrypt.compare(Password, user.password)
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid Password' })
        }

        const token = jwt.sign({ userid: user.userid, role: user.role }, process.env.JWT_SECRET_KEY)
        res.json({ token })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

usersRouter.get('/', async (req, res) => {
    try {
        const users = await usersModel.getAllUsers()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

usersRouter.get('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id)
        const user = await usersModel.getUserByID(id)
        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

usersRouter.put('/:id', authenticateToken, async (req, res) => {
    try {
        const id = Number(req.params.id)
        const user = await usersModel.getUsersByUserID(id)
        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        if (user.UserID !== req.user.userId && req.user.role !== 'Admin') {
            return res.status(403).json({ error: 'Unauthorized user for this update' })
        }

        const updatedUser = await usersModel.updateUser(id, req.body)
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

usersRouter.delete('/:id', authenticateToken, async (req, res) => {
    try {
        if (req.user.role !== 'Admin') {
            return res.status(403).json({ error: 'Unauthorized' })
        }

        const id = Number(req.params.id)
        await usersModel.deleteUser(id)
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

module.exports = usersRouter;
