import {NotificationVO} from './notification-vo';

class Application {

    /**
     * @type {ConfigVO} #configVO
     */
    static #configVO;

    /**
     * @type {NotificationVO} #notificationSuccess
     */
    static notificationSuccess;

    /**
     * @type {NotificationVO} #notificationError
     */
    static notificationError;

    /**
     * @param {ConfigVO} configVO
     */
    static init(configVO) {
        Application.#configVO = configVO;
        Application.notificationSuccess = new NotificationVO({});
        Application.notificationError = new NotificationVO({});
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
