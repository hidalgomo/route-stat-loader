import { Displayer } from './displayer';

class ModalBg extends Displayer {
    constructor() {
        super(document.querySelector('.modal-bg'));
        this.element && this.element.addEventListener('click', () => this.executables.forEach(x => x()));
    }

    init = (executables) => this.executables = executables;
}

export const modalBg = new ModalBg();