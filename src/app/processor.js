import {empty, navigateTo} from '../base/utils';
import {AjaxRequest} from './ajax-request';
import {Application} from "./application";

class Processor {

    /**
     * @type {Application} application
     */
    static #application;

    /**
     */
    constructor() {
        if (empty(Processor.application)) {
            throw new Error('WPDivision error: Application Object is not defined. Please set correct object reference in the application bootstrap.');
        }

        if (Processor.application.constructor !== Application.constructor) {
            throw new Error('WPDivision error: Application object type is not correct.');
        }
    }

    /**
     * @param {Application} application
     */
    static set application(application) {
        this.#application = application;
    }

    /**
     * @return {Application}
     */
    static get application() {
        return this.#application;
    }


    /**
     * @param {string} actionName
     * @param {ValueObject} valueObject
     * @param {function(AjaxResponse)} callbackFunction
     */
    actionCall(actionName, valueObject, callbackFunction) {
        const ajaxRequest = new AjaxRequest(
            Processor.application.config()
        );

        ajaxRequest.call(actionName, valueObject.toObject(), (ajaxResponse) => {
            if (!empty(ajaxResponse.responseURL)) {
                navigateTo(ajaxResponse.responseURL);
                return;
            }

            if (!empty(ajaxResponse.responseError)) {
                Processor.application.notificationError(ajaxResponse.responseError);
                Processor.application.notificationSuccess('');
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