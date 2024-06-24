const express = require('express');
const { initDb } = require('./models');
const middleware = require('./utils/middleware');

const activitiesRouter = require('./controllers/activities');
const enrollmentsRouter = require('./controllers/enrollments');
const gradesRouter = require('./controllers/grades');
const requestsRouter = require('./controllers/requests');
const subjectsRouter = require('./controllers/subjects');
const usersRouter = require('./controllers/users');
const cors = require('cors');

const app = express();

app.use(cors(
    {
        origin: 'http://localhost:5173',
        methods: 'GET,POST,PUT,DELETE',
        allowedHeaders: 'Content-Type,Authorization',
    }
));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(middleware.requestLogger);

app.use('/api/cv/activities', activitiesRouter);
app.use('/api/cv/enrollments', enrollmentsRouter);
app.use('/api/cv/grades', gradesRouter);
app.use('/api/cv/requests', requestsRouter);
app.use('/api/cv/subjects', subjectsRouter);
app.use('/api/cv/users', usersRouter);

app.use(middleware.unknownEndpoint);

const initializeApp = async () => {
    await initDb();
    return app;
};

module.exports = initializeApp;
