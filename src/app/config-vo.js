import {ValueObject} from '../base/value-object';

class ConfigVO extends ValueObject {

    /**
     * @type {string} objectName
     */
    objectName = 'ConfigVO';

    /**
     * @type {string} apiUrl
     */
    #apiUrl;

    /**
     * @type {string} siteUrl
     */
    #siteUrl;

    /**
     * @type {string} sessionId
     */
    #sessionId;

    /**
     * @type {string} stateToken
     */
    #stateToken;

    /**
     * @type {number} timeDelta
     */
    #timeDelta;

    /**
     * @type {array} tokenBase
     */
    #tokenBase;

    /**
     * @param {Object} data
     */
    constructor(data) {
        super(data);
        if (Array.isArray(data)) {
            data = {};
        }
        this.#tokenBase = data.tokenBase;
        this.#apiUrl = data.apiUrl;
        this.#siteUrl = data.siteUrl;
        this.#timeDelta = data.timestamp - Math.floor(Date.now() / 1000);
        this.#stateToken = data.stateToken;
        this.#sessionId = data.sessionId;
    }

    /**
     * @return {string}
     */
    toString() {
        return super.toString(this);
    }

    /**
     * @param {string} propertyName
     * @param {string|number|null} propertyValue
     * @return {ConfigVO}
     */
    updateVO(propertyName, propertyValue) {
        return new ConfigVO({...this.toObject(), ...{[propertyName]: propertyValue}});
    }

    /**
     * @return {Object}
     */
    toObject() {
        return {
            tokenBase: this.#tokenBase,
            objectName: this.objectName,
            apiUrl: this.#apiUrl,
            siteUrl: this.#siteUrl,
            timeDelta: this.#timeDelta,
            stateToken: this.#stateToken,
            sessionId: this.#sessionId,
        };
    }

    /**
     * @return {Array}
     */
    get tokenBase() {
        return this.#tokenBase;
    }

    /**
     * @return {number}
     */
    get timeDelta() {
        return this.#timeDelta;
    }

    /**
     * @return {string}
     */
    get apiUrl() {
        return this.#apiUrl;
    }

    /**
     * @return {string}
     */
    get siteUrl() {
        return this.#siteUrl;
    }

    /**
     * @return {string}
     */
    get sessionId() {
        return this.#sessionId;
    }

    /**
     * @return {string}
     */
    get stateToken() {
        return this.#stateToken;
    }
}

/**
 * Module exports
 */
export {ConfigVO};