import { Artifact } from "./artifact";

class DateDetails extends Artifact {
    constructor() {
        super(document.querySelector('.datetime-container'));
    }
}

export const dateDetails = new DateDetails();