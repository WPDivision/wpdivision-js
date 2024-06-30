class ValueObject {

    /**
     * Base class constructor. Validation routines.
     *
     * @param {Object} data
     */
    constructor(data) {
        if (data === undefined) {
            throw new Error('WPDivision error: ValueObject constructor must be object, undefined value provided.');
        }

        if (data === null) {
            throw new Error('WPDivision error: ValueObject constructor must be object, null value provided.');
        }

        if (data instanceof Function) {
            throw new Error('WPDivision error: ValueObject constructor must be object, function provided.');
        }
    }

    /**
     */
    toObject() {
        throw new Error('WPDivision error: This method must be implemented in the inherited class');
    }

    /**
     * @param {string} name
     * @param {string|number|boolean} $value
     * @return {ValueObject}
     */
    updateVO(name, $value) {
        const data = this.toObject();
        data[name] = $value;

        return Object.create(this, {
            constructor: {
                data
            },
        });
    }

    /**
     * @param {ValueObject} object
     * @return {string}
     */
    toString(object) {
        return JSON.stringify(object.toObject());
    }
}

/**
 * Module exports
 */
export {ValueObject};