const pool = require('../utils/db');

const getAllEnrollments = () => {
    return pool.query('SELECT * FROM Enrollments')
        .then(res => res.rows)
        .catch(err => { throw err; });
};

const getEnrollmentsByEnrollmentID = (id) => {
    return pool.query('SELECT * FROM Enrollments WHERE EnrollmentID = $1', [id])
        .then(res => res.rows[0])
        .catch(err => { throw err; });
};

const getEnrollmentsByUserID = (id) => {
    return pool.query('SELECT * FROM Enrollments WHERE UserID = $1', [id])
        .then(res => res.rows)
        .catch(err => { throw err; });
};

const getEnrollmentsBySubjectID = (id) => {
    return pool.query('SELECT * FROM Enrollments WHERE SubjectID = $1', [id])
        .then(res => res.rows)
        .catch(err => { throw err; });
};

const createEnrollment = (UserID, SubjectID, Role) => {
    const sql = 'INSERT INTO Enrollments (UserID, SubjectID, Role) VALUES ($1, $2, $3) RETURNING *';
    return pool.query(sql, [UserID, SubjectID, Role])
        .then(res => res.rows[0])
        .catch(err => { throw err; });
};

const updateEnrollment = (id, UserID, SubjectID, Role) => {
    const sql = 'UPDATE Enrollments SET UserID = $1, SubjectID = $2, Role = $3 WHERE EnrollmentID = $4';
    return pool.query(sql, [UserID, SubjectID, Role, id])
        .then(() => {})
        .catch(err => { throw err; });
};

const deleteEnrollment = (id) => {
    return pool.query('DELETE FROM Enrollments WHERE EnrollmentID = $1', [id])
        .then(() => {})
        .catch(err => { throw err; });
};

module.exports = {
    getAllEnrollments,
    getEnrollmentsByEnrollmentID,
    getEnrollmentsByUserID,
    getEnrollmentsBySubjectID,
    createEnrollment,
    updateEnrollment,
    deleteEnrollment
};
