import { Artifact } from "./artifact";
/**
 * The Displayer class is uninstatiable class that provides functionality to sub-classes whose focus
 * is either hiding (set display to none) or showing the specified HTML element. */
 export class Displayer extends Artifact {

    /**
     * @param { [Element] } element stores DOM element that will either be hidden or shown. */
    constructor(element) {
        super(element);

        if (this.constructor === Displayer) {
            throw new Error('Abstract class cannot be instantiated.');
        }
    }

    /**
     * Thi method performs a class removal of the specified element. The method removes
     * a class name that holds styles such as display none in order to hide the element. */
    show = () => this.element.classList.remove('display-none');

    /**
     * This method performs a class addition of the specified element. The method adds
     * a class name that holds styles such as display none in order to hide the element. */
    hide = () => this.element.classList.add('display-none');
}