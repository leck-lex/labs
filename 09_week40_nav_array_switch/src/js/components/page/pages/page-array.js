import shuffle from 'lodash/shuffle';
import random from 'lodash/random';
import { App } from '../../../core/app/app';
import { TooltipConfig } from '../../tooltip/config/tooltipconfig';
import { Tooltip } from '../../tooltip/tooltip';
import { Page } from '../page';

export class PageArray extends Page {
    /** @type {string[]} */
    #names;

    /** @type {object[]} */
    #stepArrays = [];

    /** @type {Tooltip} */
    #tooltip;

    /**
     * @constructor
     * @param {ElementConfig} config
     */
    constructor(config) {
        super(config);
        this.render();
    }

    /**
     * @returns {object}
     */
    get defaults() {
        return { id: 'page-array', classList: 'page page-array' };
    }

    /**
     *
     */
    render() {
        this.#buildHTML();
        this.#names = shuffle(this.copy.names);
        this.addEventListener('click', this, true);
        window.addEventListener('resize', this);
    }

    /**
     *
     */
    destroy() {
        this.removeEventListener('click', this, true);
        window.removeEventListener('resize', this);
        this.#removeTooltip();
        super.destroy();
    }

    /**
     * @param {Event} e
     */
    handleEvent(e) {
        if (e.type === 'click') {
            switch (e.target.dataset.type) {
                case 'step':
                    this.#goToStep(+e.target.dataset.step);
                    break;
                case 'stack':
                    this.#toggleTooltip(e.target);
                    break;
                case 'reset':
                    App.instance.goToPage(this.id);
                    break;
            }
        } else if (e.type === 'resize') {
            this.#removeTooltip();
        }
    }

    /**
     *
     */
    #buildHTML() {
        super.render(this.getStepsHTML());
        this.append(this.#getButton(['page-btn-reset'], { type: 'reset' }, 'Reset'));

        this.querySelectorAll('.page__step').forEach((step, index) => {
            step.querySelector('.page__step-inset').append(
                this.#getButton(['page__step-btn'], { type: 'step', step: index + 1 }, 'Generate')
            );
        });
    }

    /**
     * @returns {HTMLButtonElement}
     */
    #getButton(classes, dataset, text) {
        let btn = document.createElement('button');
        btn.classList.add(...classes);
        Object.assign(btn.dataset, dataset);
        btn.innerHTML = text;
        return btn;
    }

    /**
     * @param {number} step
     */
    #goToStep(step) {
        for (let i = this.#stepArrays.length; i < step; i++) {
            this.#drawStep(i + 1);
        }
        this.#scrollToStep(step);
    }
    /**
     * @param {number} step
     */
    #scrollToStep(step) {
        this.querySelector('#step-' + step).scrollIntoView({
            behavior: 'smooth',
        });
    }
    /**
     * @param {number} step
     */
    #drawStep(step) {
        step <= 4 ? this.#generateStepArray(step) : this.#drawStepLog();
        this.querySelector('#step-' + step + ' > .page__step-inset > button').classList.add(
            'is-hidden'
        );
        this.querySelector('button[data-type="reset"]').classList.remove('is-hidden');
        this.#removeTooltip();
        if (step === 1) this.addInstruction();
    }
    /**
     * @param {number} step
     */
    #generateStepArray(step) {
        let arr;
        switch (step) {
            case 1:
                arr = this.#createArray(8, 3);
                break;
            case 2:
                arr = this.#createArray(4);
                break;
            case 3:
                arr = [...this.#stepArrays[0], ...this.#stepArrays[1]];
                break;
            case 4:
                arr = this.#stepArrays[2].filter((person) => person.height > 200);
                break;
        }
        this.#stepArrays.push(arr);
        this.#drawArray(step, arr);
    }
    /**
     * @param {number} length of array
     * @param {number} forceHeight number of persons that should be taller than 200 cm
     * @returns {object[]}
     */
    #createArray(length, forceHeight = 0) {
        let arr = [];
        for (let i = 0; i < length; i++) {
            arr.push({
                name: this.#names.shift(),
                age: random(18, 99),
                height: i < forceHeight ? random(201, 220) : random(140, 220),
            });
        }
        return shuffle(arr);
    }

    /**
     * @param {number} step
     * @param {object[]} arr
     */
    #drawArray(step, arr) {
        let classBase = 'page-array__chart';
        const chart = document.createElement('div');
        chart.classList.add(classBase);
        this.querySelector('#step-' + step + ' > .page__step-inset').append(chart);

        arr.forEach((person, i) => {
            let className = classBase + '-stack';

            let stack = document.createElement('div');
            stack.classList.add(className);
            stack.dataset.type = 'stack';
            Object.assign(stack.dataset, person);
            chart.append(stack);

            let graphic = document.createElement('div');
            className += '-graphic';
            graphic.classList.add(className);
            graphic.style.height = person.height + 'px';
            stack.append(graphic);

            let span = document.createElement('span');
            className += '-span';
            span.classList.add(className + '--top');
            span.innerHTML = '<p>' + i + '</p>';
            graphic.append(span);

            span = document.createElement('span');
            span.classList.add(className + '--bottom');
            span.innerHTML = (person.height / 100).toFixed(2) + ' m';
            graphic.append(span);
        });
    }
    /**
     *
     */
    #drawStepLog() {
        this.#stepArrays[3].forEach((element) => {
            console.log(element);
        });

        const con = document.createElement('div');
        con.classList.add('page-array__console');
        this.querySelector('#step-5 > .page__step-inset').append(con);

        let htmlString = '';
        for (const person of this.#stepArrays.pop()) {
            htmlString += `<p>{<span class="key">name</span>: 
                <span class="value--string">'${person.name}'</span>, 
                <span class="key">age</span>: 
                <span class="value--number">${person.age}</span>, 
                <span class="key">height</span>: 
                <span class="value--number">${person.height}</span>}</p>`;
        }
        con.innerHTML = htmlString;
    }

    /**
     * @param {HTMLElement} input
     */
    #toggleTooltip(target) {
        if (this.#tooltip && this.#tooltip.targetElement === target) {
            this.#removeTooltip();
        } else {
            this.#removeTooltip();
            this.#tooltip = new Tooltip(
                new TooltipConfig({
                    mode: Tooltip.MODE_INFO,
                    targetElement: target,
                    msg: target.dataset.name + ', ' + target.dataset.age + ' y/o',
                    offsetX: target.offsetWidth * 0.5,
                    offsetY: target.offsetHeight - target.dataset.height - 10,
                })
            );
        }
    }

    /**
     *
     */
    #removeTooltip() {
        if (this.#tooltip) this.#tooltip.destroy();
        this.#tooltip = undefined;
    }
}

/**
 * @comment Register as custom html-element
 */
window.customElements.define('component-page-array', PageArray);
