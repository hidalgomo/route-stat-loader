import { Displayer} from './displayer';
class Notification extends Displayer {

    #createMessage(message) {
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('message');

        messageContainer.innerHTML = `
            <div class="message">
                <div class="message-actions">
                    <button class="btn message-close-btn" title="Close Message">X</button>
                </div>
                <div class="message-body">${ message }</div>
            </div>`;

        messageContainer.querySelector('.message-close-btn').addEventListener('click', _ => {
            messageContainer.remove();

            if (!this.messageListNode.innerHTML) {
                this.hide();
            }
        });

        return messageContainer;
    }

    constructor() {
        super(document.querySelector('.notification-container'));
        this.messageListNode = this.element.querySelector('.message-list');
    }

    add = message => this.messageListNode.appendChild(this.#createMessage(message));
}

export const notification = new Notification();