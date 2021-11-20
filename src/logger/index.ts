import logger from 'pino';
import dayjs from 'dayjs';


/**
 * Loger pro aplikaci.
 */
const log = logger({
    prettyPrint: true,
    base: {
        pid: false
    },
    timestamp: () => `,"time":"${dayjs().format()}"`
});

export default log;