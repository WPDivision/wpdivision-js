/**
 * Low level class for AJAX remote calls.
 */
class AjaxCall {

    /**
     * @param {string} requestMethod POST/GET
     * @param {string} url
     * @param {string} requestBody  request data.
     * @param {Object} headers.
     *
     * @return {Object}
     */
    static fetch(
        requestMethod,
        url,
        requestBody,
        headers = {}) {

        const request = {
            url: url,
            body: requestBody,
            cache: 'no-cache',
            method: requestMethod,
            headers: new Headers(headers),
            credentials: 'include'
        };

        let status = null;

        return fetch(url, request)
            .then(response => {
                status = response.status;
                return response.text();
            })
            .then(data => {
                return {
                    responseCode: status,
                    responseBody: data
                };
            });
    }
}

/**
 * Module exports
 */
export {AjaxCall};