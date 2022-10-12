/**
 * The Artifact class is a non-instantiable (abstract) class that provides minimal reusability for
 * the parameters passed via the extended constructor.
 */
 export class Artifact {

    executables = [];

    /**
     * 
     * @param {[Element]} element stores a DOM element for sub-classes to utilize. This property
     * cannot be modified once it is set (non-writable).
     */
    constructor(element) {
        if (this.constructor === Artifact) {
            throw new Error('Abstract class cannot be instantiated.');
        }

        Object.defineProperty(this, 'element', {
            value: element,
            writable: false
        });
    }
}