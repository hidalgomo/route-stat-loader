import { Route } from "./route.js";
import { Borough } from "./borough.js";

class Factory {

    constructor(classesObj) {
        Object.assign(this, classesObj);
    }

    create(className, parameters) {
        // There is minor pollution of the global scope regarding the below code.
        // A namespace is needed to avoid polluting the global scope and possible code re-structuring.
        return new this[className](parameters);
    }
}

export const factory = new Factory({
    Route,
    Borough
});;