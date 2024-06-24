const pool = require('../utils/db');

const getAllSubjects = () => {
    return pool.query('SELECT * FROM Subjects')
        .then(res => res.rows)
        .catch(err => { throw err; });
};

const getSubjectByID = id => {
    return pool.query('SELECT * FROM Subjects WHERE SubjectID = $1', [id])
        .then(res => res.rows)
        .catch(err => { throw err; });
};

const createSubject = (Name, Year, Description, Status) => {
    return pool.query('INSERT INTO Subjects (Name, Year, Description, Status) VALUES ($1, $2, $3, $4) RETURNING *', [Name, Year, Description, Status])
        .then(res => res.rows[0])
        .catch(err => { throw err; });
};

const updateSubject = subject => {
    return pool.query('UPDATE Subjects SET Name = $1, Year = $2, Description = $3, Status = $4 WHERE SubjectID = $5', [subject.Name, subject.Year, subject.Description, subject.Status, subject.SubjectID])
        .then(() => {})
        .catch(err => { throw err; });
};

const deleteSubject = async id => {
    return pool.query('DELETE FROM Subjects WHERE SubjectID = $1', [id])
        .then(() => {})
        .catch(err => { throw err; });
};

module.exports = {
    getAllSubjects,
    getSubjectByID,
    createSubject,
    updateSubject,
    deleteSubject
};
