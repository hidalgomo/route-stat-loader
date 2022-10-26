import { boroughMapping } from "./mappings";

export class Borough {

    constructor(obj) { 
        Object.assign(this, obj);
        this.fullName = boroughMapping[this.borough] && boroughMapping[this.borough].name;
        this.Route = [];
    }

    template(callback) {
        const containerElement = document.createElement('div');
        containerElement.classList.add('borough');
        containerElement.id = this.borough;
        containerElement.innerHTML = `
            <div class="borough-label">
                <div>${ this.fullName }</div>
            </div>
            <div class="route-container"></div>`;

        if (callback) {
            containerElement.addEventListener('click', callback);
        }

        return containerElement;
    }
}
