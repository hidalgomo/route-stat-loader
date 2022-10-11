class HttpHandler {
    constructor() { }

    getParameters() {
        let parameters = window.location.hash.substring(1);
        return `?${ parameters }`;
    }

    async get(url) {
        return await fetch(url)
            .then(response => response.json());
    }
}

export const httpHandler = new HttpHandler();