class HttpHandler {
    #domain;

    constructor() { }

    domain(domain) {
        this.#domain = domain;
        return this;
    }

    getParameters = () => window.location.hash.substring(1);

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