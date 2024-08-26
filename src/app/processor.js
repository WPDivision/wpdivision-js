import {empty, navigateTo} from '../base/utils';
import {AjaxRequest} from './ajax-request';
import {ConfigVO} from './config-vo';

class Processor {

    /**
     * @type {ConfigVO} configVO
     */
    static #configVO;

    /**
     */
    constructor() {
        if (empty(Processor.configVO)) {
            throw new Error('WPDivision error: Processor config is not defined. Please set correct object reference in the application bootstrap.');
        }

        if (Processor.configVO.constructor !== ConfigVO.constructor) {
            throw new Error('WPDivision error: Config object type is not correct.');
        }
    }

    /**
     * @param {ConfigVO} configVO
     */
    static set config(configVO) {
        this.#configVO = configVO;
    }

    /**
     * @return {ConfigVO}
     */
    static get config() {
        return this.#configVO;
    }


    /**
     * @param {string} actionName
     * @param {ValueObject} valueObject
     * @param {function(AjaxResponse)} callbackFunction
     */
    actionCall(actionName, valueObject, callbackFunction) {

        const ajaxRequest = new AjaxRequest(
            Processor.config
        );

        ajaxRequest.call(actionName, valueObject.toObject(), (ajaxResponse) => {
            if (!empty(ajaxResponse.responseURL)) {
                navigateTo(ajaxResponse.responseURL);
                return;
            }

            if (callbackFunction instanceof Function) {
                callbackFunction(ajaxResponse);
            }
        });
    }
}

/**
 * Module exports
 */
export {Processor};