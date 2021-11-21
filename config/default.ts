const fs = require('fs');
const privateKey = fs.readFileSync('config/keys/private_key', 'utf8');

/**
 * Konfigurace runtime prostředí.
 */
export default {
    port: 1337,
    host: 'localhost',
    dbUri: 'mongodb://localhost:27017/todolist',
    saltWorkFactor: 10,
    accessTokenTtl: '15m',
    refreshTokenTtl: '1y',
    privateKey
};