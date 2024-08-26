class ValueObjectList {

    /**
     * @param {array} data
     */
    constructor(data) {
        if (data === undefined) {
            throw new Error('WPDivision error: ValueObjectList constructor expects array, undefined value provided.');
        }

        if (data === null) {
            throw new Error('WPDivision error: ValueObjectList constructor expects array, null value provided.');
        }

        if (!Array.isArray(data)) {
            throw new Error('WPDivision error: ValueObjectList constructor expects array.');
        }
    }

    /**
     * @param {array} array
     * @return {array.<ValueObject>}
     */
    toObject(array) {
        const data = [];

        array.forEach(function (value, index) {
            data.push(value.toObject());
        });

        return data;
    }

    /**
     * @param {ValueObjectList} object
     * @return {string}
     */
    toString(object) {
        return JSON.stringify(object.toObject());
    }
}

/**
 * Module exports
 */
export {ValueObjectList};