import { Borough } from './borough';
import { Schema } from './schema';
import { Message } from '../notification/message';
import { NonArtifact } from './non-artifact';
import { Route } from './route';

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