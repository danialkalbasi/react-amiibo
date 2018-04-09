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

    getByCharacter(character) {
        return this.httpMethodsService.get(`${URL.GET}/?character=${character}`, true)
            .then(result => result.amiibo).catch(() => this.handleError());
    }

    getByType(name) {
        return this.httpMethodsService.get(`${URL.GET}/?type=${name}`, true)
            .then(result => result.amiibo);
    }

    getByAmiiboSeries(amiiboSeries) {
        return this.httpMethodsService.get(`${URL.GET}/?amiiboSeries=${amiiboSeries}`, true)
            .then(result => result.amiibo);
    }

    getByGameSeries(gameSeries) {
        return this.httpMethodsService.get(`${URL.GET}/?gameSeries=${gameSeries}`, true)
            .then(result => result.amiibo);
    }

    handleError() {
        return Promise.resolve([]);
    }
}
