import { Displayer} from './displayer';
class Notification extends Displayer {
    constructor() {
        super(document.getElementById('notification-container'));
    }
}

export const notification = new Notification();