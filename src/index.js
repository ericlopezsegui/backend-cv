const config = require('./utils/config');
const logger = require('./utils/logger');
const initializeApp = require('./app');
const https = require('https');
const fs = require('fs');
const path = require('path');

const checkFileExists = (filePath) => {
    return fs.promises.access(filePath, fs.constants.F_OK)
        .then(() => true)
        .catch(() => false);
};

const initServer = async () => {
    try {
        const keypath = path.join(__dirname, '..', 'server.key');
        const certpath = path.join(__dirname, '..', 'server.cert');

        const keyExists = await checkFileExists(keypath);
        const certExists = await checkFileExists(certpath);

        if (!keyExists || !certExists) {
            throw new Error('Key or certificate file not found');
        }
        const privateKey = fs.readFileSync(keypath, 'utf8');
        const certificate = fs.readFileSync(certpath, 'utf8');

        const credentials = { key: privateKey, cert: certificate };

        const app = await initializeApp();
        const server = https.createServer(credentials, app);
        
        server.listen(config.PORT, '0.0.0.0', () => {
            logger.info(`Server running on port ${config.PORT}`);
        });
    } catch (error) {
        logger.error(`Error initializing server: ${error.message}`);
        process.exit(1); // Salir del proceso con un error
    }
};

initServer();
