/**
 * The Artifact class is a non-instantiable class that provides base functionality for 
 * the element parameters passed via the extended constructor. */
 export class Artifact {

    executables = [];

    /**
     * 
     * @param {[Element]} element stores a DOM element for sub-classes to utilize. This property
     * cannot be modified once it is set (non-writable). */
    constructor(element) {
        if (this.constructor === Artifact) {
            throw new Error('Artifact class cannot be instantiated.');
        }

        Object.defineProperty(this, 'element', {
            value: element,
            writable: false
        });
    }
}