import express from 'express';
import config from 'config';
import log from "./logger";
import connect from './db/connect';
import routes from './routes';

const port = config.get('port') as number;
const host = config.get('host') as string;

const app = express();

/** 
 * Vytáhnu port a host z nastavení.
 */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**
 * Spuštění aplikace.
 */
app.listen(port, host, () => {
    // Info že server běží.
    log.info(`Server listening at http://${host}:${port}`);
    
    // Inicializace připojení k databázi.
    connect();

    // Inicializace url adres.
    routes(app);
});