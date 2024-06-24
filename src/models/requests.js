const pool = require('../utils/db');

const getAllRequests = () => {
    return pool.query('SELECT * FROM Requests')
        .then(res => res.rows)
        .catch(err => { throw err; });
}

const getRequestsByRequestID = id => {
    return pool.query('SELECT * FROM Requests WHERE RequestID = $1', [id])
        .then(res => res.rows[0])
        .catch(err => { throw err; });
}

const getRequestsByUserID = id => {
    return pool.query('SELECT * FROM Requests WHERE UserID = $1', [id])
        .then(res => res.rows[0])
        .catch(err => { throw err; });
}

const getRequestsBySubjectID = id => {
    return pool.query('SELECT * FROM Requests WHERE SubjectID = $1', [id])
        .then(res => res.rows)
        .catch(err => { throw err; });
}

const createRequest = (UserID, SubjectID, request_time, status) => {
    const sql = 'INSERT INTO Requests (UserID, SubjectID, request_time, status) VALUES ($1, $2, $3, $4) RETURNING *';
    return pool.query(sql, [UserID, SubjectID, request_time, status])
        .then(res => res.rows[0])
        .catch(err => { throw err; });
}

const updateRequest = (request) => {
    const sql = 'UPDATE Requests SET status = $1 WHERE RequestID = $2 RETURNING *';
    return pool.query(sql, [request.status, request.RequestID])
        .then(() => {})
        .catch(err => { throw err; });
}

const deleteRequest = id => {
    return pool.query('DELETE FROM Requests WHERE RequestID = $1', [id])
        .then(() => {})
        .catch(err => { throw err; });
}

module.exports = {
    getAllRequests,
    getRequestsByRequestID,
    getRequestsByUserID,
    getRequestsBySubjectID,
    createRequest,
    updateRequest,
    deleteRequest
};
