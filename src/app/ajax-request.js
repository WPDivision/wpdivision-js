import {empty, randomNumber, strRev} from '../base/utils';
import {AjaxCall} from './ajax-call';
import {AjaxResponse} from "./ajax-response";

/**
 * Request composition class.
 * Performs high (application) level ajax request and collects the response
 *
 */
class AjaxRequest {

    /**
     * @type {string} actionName
     */
    #actionName;

    /**
     * @type {Object} actionData
     */
    #actionData;

    /**
     * Callback function. Always called with the response (regardless if there are errors or not).
     *
     * @type {function(AjaxResponse)} #actionCallback
     */
    #actionCallback;

    /**
     * @type {ConfigVO} configVO
     */
    #configVO;

    /**
     * @param {ConfigVO} configVO
     */
    constructor(configVO) {
        /**
         * @param {AjaxResponse} ajaxResponse
         */
        this.#actionCallback = (ajaxResponse) => {
            throw new Error('WPDivision error: actionCallback is not assigned to a valid callback function.');
        };

        this.#configVO = configVO;
    }

    /**
     * @param {number} b1
     * @param {number} b2
     * @param {number} b3
     * @return {string}
     */
    #generateToken(b1, b2, b3) {
        let r = [];
        let p = 4;
        let a = Math.pow(p / 2, 11);
        let b = Math.pow(p / 2, 13) + (a / 2);
        let s = 0;
        let m = [
            {r: b1, v: randomNumber(a, b)},
            {r: b2, v: randomNumber(a, b)},
            {r: b3, v: randomNumber(a, b)}
        ];
        m.map((i) => {
            s = s + i.v;
            r.push(i.v.toString(i.r).padStart(p, '0'));
        });
        r.push(s.toString(m[1].r).padStart(p, '0'));
        r.push(Math.random().toString().substring(2, p * 2));

        return strRev(r.join(''));
    }

    /**
     *   @param {string} actionName
     *   @param {Object} actionData
     *   @param {function(AjaxResponse)} callback
     */
    call(actionName, actionData, callback = null) {
        if (empty(actionName)) {
            throw new Error('WPDivision error: actionName parameter is required for the request.');
        }

        if (typeof actionData === 'string') {
            throw new Error('WPDivision error: actionData parameter must be an object. String provided.');
        }

        if (!(actionData instanceof Object)) {
            throw new Error('WPDivision error: actionData must be an object.');
        }

        this.#actionName = actionName;
        this.#actionData = actionData;

        if (callback instanceof Function) {
            this.#actionCallback = callback;
        }

        const requestId = Math.random().toString(16).substring(2, 16);
        const configVO = this.#configVO;

        const body = {
            'name': this.#actionName,
            'data': this.#actionData,
            'state': configVO.stateToken,
            'id': requestId
        };

        const headers = {
            'Content-Type': 'application/json; charset=utf-8',
            'x-wpd-origin': window.location.href,
            'x-wpd-token': this.#generateToken(...configVO.tokenBase),
            'x-wpd-delta': Math.floor(Date.now() / 1000) + configVO.timeDelta,
        };

        /**
         * AjaxCall Call using POST
         */
        AjaxCall.fetch('POST', configVO.apiUrl, JSON.stringify(body), headers).then(
            response => {
                let code = response.responseCode;
                let data = response.responseBody;

                if (parseInt(code) === 205) {
                    location.reload();
                    return;
                }

                if (empty(data)) {
                    return;
                }

                try {
                    data = JSON.parse(data);

                    /**
                     * @type {AjaxResponse} ajaxResponse
                     */
                    let ajaxResponse = new AjaxResponse(data);

                    if (empty(ajaxResponse.responseError)) {
                        if ((ajaxResponse.responseId !== requestId) ||
                            (ajaxResponse.responseName !== this.#actionName)) {
                            ajaxResponse = new AjaxResponse(...data, {error: 'Request failed. No valid response format returned.'});
                        }
                    }

                    if (this.#actionCallback instanceof Function) {
                        this.#actionCallback(ajaxResponse);
                    }
                } catch (error) {
                    console.error(error);
                }

            }).catch(function (error) {
            console.error(error);
        });
    }

    /**
     * @return {string}
     */
    get actionName() {
        return this.#actionName;
    }

    /**
     * @param {string} value
     */
    set actionName(value) {
        this.#actionName = value;
    }

    /**
     * @return {Object}
     */
    get actionData() {
        return this.#actionData;
    }

    /**
     * @param {Object} value
     */
    set actionData(value) {
        this.#actionData = value;
    }

    /**
     * @return {function}
     */
    get actionCallback() {
        return this.#actionCallback;
    }

    /**
     * @param {function} value
     */
    set actionCallback(value) {
        this.#actionCallback = value;
    }
}

/**
 * Module exports
 */
export {AjaxRequest};