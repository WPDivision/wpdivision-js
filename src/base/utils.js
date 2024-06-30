/**
 * Checking against emtpy/null/undefined values.
 *
 * @param {*} value
 * @return {boolean}
 */

function empty(value) {

    if (value === undefined) {
        return true;
    }

    if (value === null) {
        return true;
    }

    if (value === '') {
        return true;
    }

    if (Array.isArray(value)) {
        return (value.length === 0);
    }

    if (value instanceof Object) {
        return (Object.keys(value).length === 0);
    }

    let res = !!value;
    return !res;
}

/**
 * @param {string} newURL
 * @param {boolean} newWindow
 */
function navigateTo(newURL, newWindow = false) {

    if (empty(newURL)) {
        return;
    }
    if (newWindow) {
        window.open(newURL, Math.random().toString());
    } else {
        window.location = newURL;
    }
}

/**
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
function randomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * @param {string} string
 * @return {string}
 */
function strRev(string) {
    string = string.split('');
    string = string.reverse();
    return string.join('');
}

/**
 * Module exports
 */
export {
    empty,
    navigateTo,
    randomNumber,
    strRev
};

