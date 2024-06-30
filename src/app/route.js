import {empty} from "../base/utils";

/**
 * Route Helper class.
 *
 * Format links by the pattern: <baseSiteURL>/<page>?[queryParameters]
 */
class Route {

    /**
     * @type {string} baseSiteURL
     */
    static baseSiteURL = '';

    /**
     * @param {string} pageSlug
     * @param {Object} pageParams
     * @return {string}
     */
    static link(pageSlug, pageParams = null) {

        const slash = (this.baseSiteURL.slice(-1) !== '/') ? '/' : '';
        const url = Route.baseSiteURL + slash + pageSlug;

        if (empty(pageParams)) {
            return url;
        }

        if (!(pageParams instanceof Object)) {
            throw new Error('WPDivision error: route pageParams must be object.');
        }

        let q = Object.keys(pageParams).map(function (key) {
            return encodeURIComponent(key) + '=' + encodeURIComponent(pageParams[key]);
        }).join('&');

        return url + '?' + q;
    }
}

/**
 * Module exports
 */
export {Route}