import { Displayer } from "../core/displayer";

class NotificationContainer extends Displayer {
    constructor() {
        super(document.querySelector('.notification-container'));
    }

    show = () => this._show();
    hide = () => this._hide();
}

export const notificationContainer = new NotificationContainer();