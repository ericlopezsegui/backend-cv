const pool = require('../utils/db');
const bcrypt = require('bcryptjs');

const getAllUsers = () => {
    return pool.query('SELECT * FROM Users')
        .then(res => res.rows)
        .catch(err => { throw err; });
};

const getUserByID = id => {
    return pool.query('SELECT * FROM Users WHERE UserID = $1', [id])
        .then(res => res.rows[0])
        .catch(err => { throw err; });
};

const getUserByUsername = async username => {
    return pool.query('SELECT * FROM Users WHERE Username = $1', [username])
        .then(res => res.rows[0])
        .catch(err => { throw err; });
};

const createUser = (Username, Name, Email, Password, Role) => {
    return pool.query('INSERT INTO Users (Username, Name, Email, Password, Role) VALUES ($1, $2, $3, $4, $5) RETURNING *', [Username, Name, Email, Password, Role])
        .then(res => res.rows[0])
        .catch(err => { throw err; });
};

const updateUser = user => {
    return pool.query('UPDATE Users SET Name = $1, Email = $2, Role = $3 WHERE UserID = $4', [user.Name, user.Email, user.Role, user.UserID])
        .then(() => {})
        .catch(err => { throw err; });
};

const deleteUser = id => {
    return pool.query('DELETE FROM Users WHERE UserID = $1', [id])
        .then(() => {})
        .catch(err => { throw err; });
};

module.exports = {
    getAllUsers,
    getUserByID,
    getUserByUsername,
    createUser,
    updateUser,
    deleteUser
};
