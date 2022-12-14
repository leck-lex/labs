import { ElementConfig } from './config/element-config';

export class CustomElement extends HTMLElement {
    /** @type {ElementConfig} */
    #config;

    /**
     * @constructor
     * @param {ElementConfig} config optional
     */
    constructor(config) {
        super();
        this.config = config ? config : new ElementConfig();
        this.validateConfig();
        this.populateFromConfig();
    }

    /**
     * @param {ElementConfig} config
     */
    set config(config) {
        this.#config = config;
    }

    /**
     * @returns {ElementConfig}
     */
    get config() {
        return this.#config;
    }

    /**
     * @returns {object}
     * @comment Override this getter to register default component id and classlist if needed
     */
    get defaults() {
        return { id: '', classList: '' };
    }

    /**
     * @param {string} htmlString
     */
    render(htmlString) {
        this.innerHTML = htmlString;
    }

    /**
     * @param {HTMLElement} element
     * @returns {CustomElement}
     */
    appendTo(element) {
        element.append(this);
        return this;
    }

    /**
     * @param {HTMLElement} element
     * @returns {CustomElement}
     */
    prependTo(element) {
        element.prepend(this);
        return this;
    }

    /**
     *
     */
    validateConfig() {
        this.config.id = this.config.id ? this.config.id : this.defaults.id;
        this.config.classList = this.defaults.classList;
    }

    /**
     *
     */
    populateFromConfig() {
        this.id = this.config.id;
        this.classList.add(...this.config.classList);
    }
    /**
     *
     */
    destroy() {
        if (this.parentElement) this.parentElement.removeChild(this);
    }
}
