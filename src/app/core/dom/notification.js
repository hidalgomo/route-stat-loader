import { Displayer} from './displayer';
class Notification extends Displayer {
    constructor() {
        super(document.querySelector('.notification-container'));
    }
}

const notificationObj = new Notification();
notificationObj.messageList = notificationObj.element.querySelector('.message-list');
export const notification = notificationObj;