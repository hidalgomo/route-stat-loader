import { Artifact } from "./artifact";

export class Slider extends Artifact {
    constructor(element) {
        super(element);

        if (this.constructor === Slider) {
            throw new Error('Abstract class cannot be instantiated.');
        }
    }

    show = width => this.element.style.width = width;
    hide = _ => this.element.style.width = 0;
}