import { Displayer } from '../core/displayer.js';

class ModalBg extends Displayer {
    constructor() {
        super(document.querySelector('.modal-bg'));
        this.element && this.element.addEventListener('click', () => this.hide());
    }

    init(executables) {
        this.executables = [...executables];
    }

    show() {
        this._show();
    }

    hide() {
        this._hide();
        this.executables.map(x => x());
    }
}

export const modalBg = new ModalBg();
