const pool = require('../utils/db');

const getAllGrades = () => {
    return pool.query('SELECT * FROM Grades')
        .then(res => res.rows)
        .catch(err => { throw err; });
};

const getGradesByGradeID = (id) => {
    return pool.query('SELECT * FROM Grades WHERE GradeID = $1', [id])
        .then(res => res.rows[0])
        .catch(err => { throw err; });
};

const getGradesByUserID = (id) => {
    return pool.query('SELECT * FROM Grades WHERE UserID = $1', [id])
        .then(res => res.rows)
        .catch(err => { throw err; });
};

const getGradesBySubjectID = (id) => {
    return pool.query('SELECT * FROM Grades WHERE SubjectID = $1', [id])
        .then(res => res.rows)
        .catch(err => { throw err; });
};

const createGrade = (UserID, SubjectID, ActivityID, Score) => {
    const sql = 'INSERT INTO Grades (SubjectID, Score, UserID, ActivityID) VALUES ($1, $2, $3, $4) RETURNING *';
    return pool.query(sql, [SubjectID, Score, UserID, ActivityID])
        .then(res => res.rows[0])
        .catch(err => { throw err; });
};

const updateGrade = (grade) => {
    const sql = 'UPDATE Grades SET Score = $1 WHERE GradeID = $2 RETURNING *';
    return pool.query(sql, [grade.Score, grade.GradeID])
        .then(() => {})
        .catch(err => { throw err; });
};

const deleteGrade = (id) => {
    return pool.query('DELETE FROM Grades WHERE GradeID = $1', [id])
        .then(() => {})
        .catch(err => { throw err; });
};

module.exports = {
    getAllGrades,
    getGradesByGradeID,
    getGradesByUserID,
    getGradesBySubjectID,
    createGrade,
    updateGrade,
    deleteGrade
};
