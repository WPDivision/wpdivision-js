class Application {

    /**
     * @type {ConfigVO} #configVO
     */
    static #configVO;

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
