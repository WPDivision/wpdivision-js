class AjaxResponse {

    /**
     * @type {string} responseName
     */
    #responseName = null;

    /**
     * @type {Object} responseData
     */
    #responseData = null;

    /**
     * @type {string} responseURL
     */
    #responseURL = null;

    /**
     * @type {string} responseError
     */
    #responseError = null;

    /**
     * @type {string} responseId
     */
    #responseId = null;

    /**
     * @param {Object} response
     */
    constructor(response) {
        if (!response.hasOwnProperty('name')) {
            throw new Error('WPDivision error: response property [name] is missing.');
        }

        if (!response.hasOwnProperty('data')) {
            throw new Error('WPDivision error: response property [data] is missing.');
        }

        if (!response.hasOwnProperty('error')) {
            throw new Error('WPDivision error: response property [error] is missing.');
        }

        if (!response.hasOwnProperty('url')) {
            throw new Error('WPDivision error: response property [url] is missing.');
        }

        this.#responseName = response.name;
        this.#responseData = response.data;
        this.#responseURL = response.url;
        this.#responseId = response.id;
        this.#responseError = response.error;
    }

    /**
     * @return {Object}
     */
    get responseData() {
        return this.#responseData;
    }

    /**
     * @return {string}
     */
    get responseName() {
        return this.#responseName;
    }

    /**
     * @return {Object[]}
     */
    get responseError() {
        return this.#responseError;
    }

    /**
     * @return {string}
     */
    get responseURL() {
        return this.#responseURL;
    }

    /**
     * @return {string}
     */
    get responseId() {
        return this.#responseId;
    }
}

/**
 * Module exports
 */
export {AjaxResponse};