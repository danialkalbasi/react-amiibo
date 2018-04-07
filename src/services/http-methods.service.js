/**
 * This service handles http methods operation
 */
export default class HttpMethodsService {
    /**
     * keep the http headers
     */
    headers = {};

    /**
     * Cache the http response
     */
    caches = [];

    /**
     * Set the default headers
     */
    constructor() {
        this.setDefaultHeaders();
    }

    /**
     * Call the get http method
     * If the URL has cache data, it will return it's data
     * otherwise it will do a new call
     * @param {*} url is the url of endpoint
     * @param {*} cache whether should be cached
     * @param {*} headers is the optional header
     */
    get(url, cache = false, headers) {
        const getHeaders = headers || this.headers;

        if (cache) {
            const urlkey = this.getUrlKey(url);
            const cached = this.caches[urlkey];

            if (cached) {
                const responsePromise = new Promise((resolve) => {
                    resolve(cached);
                });
                return responsePromise;
            }
            return this
                .baseGet(url, getHeaders)
                .then(this.toJson)
                .catch(error => Promise.reject(this.handleError(url, error)));
        }

        return this
            .baseGet(url, getHeaders)
            .then(this.toJson)
            .catch(error => Promise.reject(this.handleError(url, error)));
    }

    baseGet(url, headers) {
        const header = { headers };

        return fetch(url, header).then((result) => {
            if (result.ok) {
                return result;
            }
            return Promise.reject(this.handleError(url, JSON.stringify(result)));
        }).catch(error => Promise.reject(this.handleError(url, error)));
    }

    /**
     * Handle http errors
     * @param {*} url is the request url
     * @param {*} error is the error object
     */
    handleError(url, error) {
        const errorMessage = `The URL: ${url}, Error: ${error}`;
        throw new Error(errorMessage);
    }

    /**
     * Set default header object
     */
    setDefaultHeaders() {
        this.headers = new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
        });
    }

    /**
     * Convert response data to the arra/object
     * if the data is not json, then it iwll return the data itself
     * @param {*} data is the response data
     */
    toJson(data) {
        const isResponse = data instanceof Response;
        return isResponse ? data.json() : data;
    }

    /**
     * Generate a unique key based on the endpoint url
     * The url use as a key to retrieve a cache data for specific request
     * @param {*} url is the endpoint url
     */
    getUrlKey(url) {
        return url ? url.replace(/[^\w\s]/gi, '') : '';
    }
}
