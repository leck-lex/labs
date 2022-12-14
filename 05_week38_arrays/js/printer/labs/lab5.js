import { Printer } from "../printer.js";
import { PrinterHelpers } from "../helpers/printerhelpers.js";

export class Lab5 extends Printer {
    /** @type {array} */
    #names;
    /**
     * @constructor
     */
    constructor() {
        super(5);
        this.#names = [
            "Adam",
            "Carl",
            "Christer A",
            "Christer S",
            "Erik N",
            "Ivan",
            "Ivona",
            "Johannes",
            "Lars-Erik",
            "Matewos",
            "Miriam",
            "Niklas",
            "Ola",
            "Rickard",
            "Robert",
        ];
    }
    /**
     *
     */
    print() {
        const prefix = PrinterHelpers.lineBreak + "- ";
        let randomNames = this.#names.sort(() => 0.5 - Math.random());

        this.log(PrinterHelpers.lineBreak + "*** Lab 5 Week 38: Arrays - JavaScript ***");

        this.log(prefix + "Create an array with 5 names");
        let output = randomNames.slice(0, 5);
        this.#logArray(output);

        this.log(prefix + "Remove the last item");
        output.pop();
        this.#logArray(output);

        this.log(prefix + "Change the name at place 2 (index 1)");
        output[1] = randomNames.pop();
        this.#logArray(output);

        this.log(prefix + 'Add "Joakim"');
        output.push("Joakim");
        this.#logArray(output);

        this.log(prefix + "Sort by name");
        output.sort();
        this.#logArray(output);

        this.log(prefix + 'Find index of "Joakim"');
        let index = output.indexOf("Joakim");
        this.log(PrinterHelpers.styleNumber(index));

        this.log(prefix + 'Remove "Joakim"');
        output.splice(index, 1);
        this.#logArray(output);

        this.log(prefix + "Loop through all items");
        for (let name of output) {
            this.log(name);
        }

        this.log(PrinterHelpers.lineBreak + "*** The End ***" + PrinterHelpers.lineBreak);
    }

    #logArray(output) {
        this.log(PrinterHelpers.styleArray(output));
    }
}
