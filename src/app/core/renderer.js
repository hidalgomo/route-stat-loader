class Renderer {
    #rootElem;
    #dataSet;

    constructor() { }

    init(parentIdentifier, dataSet) {
        this.#rootElem = document.querySelector(parentIdentifier);
        this.#dataSet = dataSet;
        return this;
    }

    async renderAsync(callback) {
        this.#rootElem.innerHTML = '';

        return await new Promise((resolved, rejected) => {
            for(let obj of this.#dataSet) {
                this.#rootElem.innerHTML += callback(obj);
            }
            setTimeout(() => resolved(), 100);
        });
    }

    // Violates the single responsibility principle
    // This method is performing two things

    // possible sulution to decouple further would be to seperate
    // renderer from element modifier (modifier includes event adding)
    afterRender(callback) {
        let innerProgressBar, percent;

        for(let routeElem of this.#rootElem.getElementsByClassName('route')) {
            if (callback) {
                routeElem && routeElem.addEventListener('click', function() { callback(this); });
            }

            percent = routeElem.querySelector('.progress-percent').innerHTML;
            innerProgressBar = routeElem.querySelector('.inner-progress-bar');
            innerProgressBar.style.width = percent;
        }
    }
}

export const renderer = new Renderer();