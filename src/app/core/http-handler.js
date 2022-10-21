class HttpHandler {
    #domain;

    constructor() { }

    domain(domain) {
        this.#domain = domain;
        return this;
    }

    getParameters() {
        let parameters = window.location.hash.substring(1);
        return `?${ parameters }`;
    }

    async getAsync(parameters) {
        const url = this.#domain + parameters;
        return await fetch(url)
            .then(response => {
                if (response.ok)
                    return response.json();
                else
                    throw new Error('Unable to load data');
            });
    }
}

export const httpHandler = new HttpHandler();