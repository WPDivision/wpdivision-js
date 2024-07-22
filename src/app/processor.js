import {empty, navigateTo} from '../base/utils';
import {AjaxRequest} from './ajax-request';
import {Application} from './application';

class Processor {

    constructor() {
        //
    }

    /**
     * @param {string} actionName
     * @param {ValueObject} valueObject
     * @param {function(AjaxResponse)} callbackFunction
     */
    actionCall(actionName, valueObject, callbackFunction) {

        const ajaxRequest = new AjaxRequest(
            Application.config()
        );

        ajaxRequest.call(actionName, valueObject.toObject(), (ajaxResponse) => {
            if (!empty(ajaxResponse.responseURL)) {
                navigateTo(ajaxResponse.responseURL);
                return;
            }

            if (!empty(ajaxResponse.responseError)) {
                Application.notificationError(ajaxResponse.responseError);
                Application.notificationSuccess('');
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