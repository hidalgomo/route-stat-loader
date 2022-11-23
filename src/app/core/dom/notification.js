import { Displayer} from './displayer';
class Notification extends Displayer {
    constructor() {
        super(document.querySelector('.notification-container'));
        this.messageListNode = this.element.querySelector('.message-list');
    }

    add = messageNode => this.messageListNode.appendChild(messageNode);
}

const notificationObj = new Notification();
export const notification = notificationObj;