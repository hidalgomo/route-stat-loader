export function Message(message) {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message');

    messageContainer.innerHTML = `
        <div class="message">
            <div class="message-actions">
                <button class="btn message-close-btn" title="Close Message">X</button>
            </div>
            <div class="message-body">${ message }</div>
        </div>`;

    messageContainer.querySelector('.message-close-btn')
        .addEventListener('click', _ => messageContainer.remove());

    return messageContainer;
}
