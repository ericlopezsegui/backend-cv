const { Pool } = require('pg')
const bcrypt = require('bcryptjs')

const activitiesModel = require('./activities')
const enrollmentsModel = require('./enrollments')
const gradesModel = require('./grades')
const requestsModel = require('./requests')
const subjectsModel = require('./subjects')
const usersModel = require('./users')

const initDb = async () => {
    const initialization = new Pool({
        user: 'postgres',
        host: 'db',
        database: 'postgres',
        password: 'password',
        port: 5432,
    })

    try {
        console.log('Starting database initialization...')

        const checkDbQuery = `
            SELECT datname
            FROM pg_catalog.pg_database
            WHERE datname = 'virtual_campus';
        `

        const dbCheckResult = await initialization.query(checkDbQuery)

        if (dbCheckResult.rows.length === 0) {
            console.log('Creating virtual_campus database...')
            const createDbQuery = 'CREATE DATABASE virtual_campus;'
            await initialization.query(createDbQuery)
            console.log('virtual_campus database created.')
        }

        const virtualCampusPool = new Pool({
            user: 'postgres',
            host: 'db',
            database: 'virtual_campus',
            password: 'password',
            port: 5432,
        })

        await virtualCampusPool.query(`
            CREATE TABLE IF NOT EXISTS Users (
                UserID SERIAL PRIMARY KEY,
                Name TEXT NOT NULL,
                Username TEXT NOT NULL,
                Password TEXT NOT NULL,
                Email TEXT NOT NULL,
                Role TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS Subjects (
                SubjectID SERIAL PRIMARY KEY,
                Name TEXT NOT NULL,
                Year TEXT NOT NULL,
                Description TEXT NOT NULL,
                Status TEXT NOT NULL CHECK (status IN ('Active', 'Finnished'))
            );

            CREATE TABLE IF NOT EXISTS Activities (
                ActivityID SERIAL PRIMARY KEY,
                SubjectID INTEGER NOT NULL,
                Title TEXT NOT NULL,
                Description TEXT NOT NULL,
                Deadline DATE NOT NULL,
                FOREIGN KEY (SubjectID) REFERENCES Subjects(SubjectID) ON DELETE CASCADE
            );

            CREATE TABLE IF NOT EXISTS ActivityFiles (
                FileID SERIAL PRIMARY KEY,
                ActivityID INTEGER REFERENCES Activities(ActivityID) ON DELETE CASCADE,
                File BYTEA NOT NULL,
                FileName TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS Enrollments (
                EnrollmentID SERIAL PRIMARY KEY,
                UserID INTEGER NOT NULL,
                SubjectID INTEGER NOT NULL,
                Role TEXT NOT NULL,
                FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE,
                FOREIGN KEY (SubjectID) REFERENCES Subjects(SubjectID) ON DELETE CASCADE
            );

            CREATE TABLE IF NOT EXISTS Grades (
                GradeID SERIAL PRIMARY KEY,
                SubjectID INTEGER NOT NULL,
                Score REAL NOT NULL,
                UserID INTEGER NOT NULL,
                ActivityID INTEGER NOT NULL,
                FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE,
                FOREIGN KEY (SubjectID) REFERENCES Subjects(SubjectID) ON DELETE CASCADE,
                FOREIGN KEY (ActivityID) REFERENCES Activities(ActivityID) ON DELETE CASCADE
            );

            CREATE TABLE IF NOT EXISTS Requests (
                RequestID SERIAL PRIMARY KEY,
                UserID INTEGER NOT NULL,
                SubjectID INTEGER NOT NULL,
                request_time TEXT NOT NULL,
                status TEXT NOT NULL CHECK (status IN ('Pending', 'Approved', 'Denied')),
                FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE,
                FOREIGN KEY (SubjectID) REFERENCES Subjects(SubjectID) ON DELETE CASCADE
            );
        `);

        console.log('Database tables created successfully.')

        const adminPassword = 'admin1234';
        const hashedPassword = await bcrypt.hash(adminPassword, 10)

        await virtualCampusPool.query(`
            INSERT INTO Users (Name, Username, Password, Email, Role)
            SELECT 'Admin', 'admin', $1, 'admin@test.com', 'Admin'
            WHERE NOT EXISTS (SELECT 1 FROM Users WHERE Username = 'admin');
        `, [hashedPassword]);

        console.log('Admin user created successfully.')

        await virtualCampusPool.end();
        await initialization.end();

    } catch (err) {
        console.error('Error initializating database:', err)
        await initialization.end()
    }
};

module.exports = { initDb, activitiesModel, enrollmentsModel, gradesModel, requestsModel, subjectsModel, usersModel };