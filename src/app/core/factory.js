import { Borough } from './models/borough';
import { Schema } from './models/schema';
import { Message } from './models/message';
import { NonArtifact } from './models/non-artifact';
import { Route } from './models/route';

class Factory {

    constructor(classesObj) {
        Object.assign(this, classesObj);
    }

    create = (className, parameters) => {
        try {
            return new (this[className])(parameters);
        } catch {
            return new NonArtifact();
        }
    }
}

export const factory = new Factory({
    Route,
    Borough,
    Schema,
    NonArtifact,
    Message
});;