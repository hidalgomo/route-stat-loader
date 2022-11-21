class HttpHandler {
    #domain;

    domain(domain) {
        this.#domain = domain;
        return this;
    }

    getParameters = () => window.location.hash.substring(1);

    get(parameters) {
        const url = this.#domain + parameters;
        return fetch(url)
            .then(response => {
                if (response.ok)
                    return response.json();
                else
                    throw new Error('Unable to load data');
            });
    }
}

export const httpHandler = new HttpHandler();