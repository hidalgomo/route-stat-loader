export function Message(message) {
    this.template = () => `
        <div class="message">
            <div class="message-actions">
                <button class="btn message-close-btn" title="Close Message">X</button>
            </div>
            <div class="message-body">${ message }</div>
        </div>`;
}

// Message.template.prototype.addEvent = (callback) => console.log(  );