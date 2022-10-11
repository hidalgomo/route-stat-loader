import { Artifact } from "./artifact";

export class Slider extends Artifact {
    constructor(element) {
        super(element);

        if (this.constructor === Slider) {
            throw new Error('Abstract class cannot be instantiated.');
        }
    }

    _show(width) {
        this.element.style.width = width;
    }

    _hide() {
        this.element.style.width = 0;
    }
}