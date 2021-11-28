import mongoose from 'mongoose';
import config from 'config';
import log from '../logger';

/**
 * Url, na které se nachází databáze.
 */
const uri = config.get("dbUri") as string;

/**
 * Funkce, sloužící pro připojení k MongoDb.
 */
function connect() {
    let result = mongoose
        .connect(uri)
        .then(() => {
            log.info('Database connected');
        })
        .catch((error) => {
            log.error('Error while connecting to dababase', error);
            
            // Ukončím process jako chybný.
            process.exit(1);
        });
}

export default connect;