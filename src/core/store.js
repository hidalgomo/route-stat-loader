import { boroughMapping } from './mappings.js';
import { factory } from './factory.js';

class Store {
    #factory;
    #boroughs = [];
    #routes = [];

    #extractUniqueBoroughNamesFromRoutes(routes) {
        return [...new Set(routes.map(x => x.borough))];
    }

    #loadBoroughs(uniqueBoroughNames) {
        return uniqueBoroughNames.map(boroughShortName => this.#factory.create('Borough', boroughShortName));
    }

    #loadRoutes(routes) {
            return routes.map(route => this.#factory.create('Route', route));
    }

    constructor(factory) {
        this.#factory = factory;
    }

    load(data) {
        this.#boroughs = this.#loadBoroughs(this.#extractUniqueBoroughNamesFromRoutes(data.routes));
        this.#routes = this.#loadRoutes(data.routes);
    }

    sortByOrderNum() {
        this.#boroughs = this.#boroughs.sort((a, b) => {
            if (!boroughMapping[a.shortName] || !boroughMapping[b.shortName]) {
                return 1;
            }

            return boroughMapping[a.shortName].orderNum < boroughMapping[b.shortName].orderNum? -1 : 1;
        });
    }

    getBoroughsWithUniqueRoutes() {
        const uniqueRoutes = [];
        const uniqueRouteNames = new Set();

        for(let route of this.#routes) {
            if (uniqueRouteNames.has(route.route_name)) {
                continue;
            }

            uniqueRoutes.push(route);
            uniqueRouteNames.add(route.route_name);
        }

        for (let borough of this.#boroughs) {
            borough.routes = uniqueRoutes.filter(x => borough.shortName === x.borough);
        }

        return this.#boroughs;
    }

    getRoutesByName(routeName) {
        return this.#routes.filter(x => x.route_name === routeName);
    }
}

export const store = new Store(factory);