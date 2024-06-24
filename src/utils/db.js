const { Pool } = require('pg');
const config = require('./config');

const pool = new Pool({
    connectionString: config.POSTGRES_URL
});

module.exports = pool;
