import { AxiosRequestHeaders } from "axios";

/**
 * Výchozí header pro všechny requesty.
 */
var defaultHeader : AxiosRequestHeaders = {
    'Content-type': 'application/json',
    crossDomain: 'true'
}

export default defaultHeader;