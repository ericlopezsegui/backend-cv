require('dotenv').config();

module.exports = {
    PORT: process.env.PORT,
    POSTGRES_URL: process.env.POSTGRES_URL,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    TEST_POSTGRES_URL: process.env.TEST_POSTGRES_URL
};
