import {NotificationVO} from './notification-vo';

class Application {

    /**
     * @type {ConfigVO} #configVO
     */
    static #configVO;

    /**
     * @type {function(string|NotificationVO)} #notificationSuccess
     */
    static notificationSuccess = (message) => {
        throw new Error('WPDivision error: notificationSuccess callback function must be implemented in the application.');
    };

    /**
     * @type {function(string|NotificationVO)} #notificationError
     */
    static notificationError = (message) => {
        throw new Error('WPDivision error: notificationError callback function must be implemented in the application.');
    };

    /**
     * @param {ConfigVO} configVO
     */
    static init(configVO) {
        Application.#configVO = configVO;
    }

    /**
     * @return {ConfigVO}
     */
    static config() {
        return Application.#configVO;
    }
}

/**
 * Module exports
 */
export {Application};
