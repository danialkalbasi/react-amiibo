import { URL } from '../constants';

/**
 * Manage all the api calls to amiibo api endpoints
 */
export default class AmiiboService {
    httpMethodsService;

    constructor(httpMethodsService) {
        this.httpMethodsService = httpMethodsService;
    }

    list() {
        return this.httpMethodsService.get(`${URL.GET}/`, true).then(result => result.amiibo);
    }
}
