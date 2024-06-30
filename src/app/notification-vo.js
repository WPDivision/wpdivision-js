import {ValueObject} from '../base/value-object';

class NotificationVO extends ValueObject {

    objectName = 'NotificationVO';
    /**
     * @type {string} code
     */
    #code;
    /**
     * @type {string} message
     */
    #message;

    /**
     * @param {Object} data
     */
    constructor(data) {
        super(data);
        this.#code = data.code;
        this.#message = data.message;
    }

    /**
     * @return {string}
     */
    toString() {
        return super.toString(this);
    }

    /**
     * @return {Object}
     */
    toObject() {
        return {
            code: this.#code,
            message: this.#message,
            objectName: this.objectName
        };
    }

    /**
     * @return {string}
     */
    get code() {
        return this.#code;
    }

    /**
     * @return {string}
     */
    get message() {
        return this.#message;
    }

    /**
     * @param {string} value
     */
    set message(value) {
        this.#message = value;
    }
}

/**
 * Module exports
 */
export {NotificationVO};