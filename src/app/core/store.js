import { boroughMapping } from './mappings';
import { factory } from './factory';
class Store {
    #factory;
    #boroughs = [];
    #routes = [];

    #extractUniqueBoroughsFromRoutes(routes) {
        return [...new Set(routes.map(x => x.borough))]
            .map(boroughName => routes.find(route => route.borough === boroughName));
    }

    #loadBoroughs(uniqueBorough) {
        // need to pass entire object not just shortname (borough)
        return uniqueBorough.map(borough => this.#factory.create('Borough', borough));
    }

    #loadRoutes(routes) {
            return routes.map(route => this.#factory.create('Route', route));
    }

    constructor(factory) {
        this.#factory = factory;
    }

    load(data) {
        this.#boroughs = this.#loadBoroughs(this.#extractUniqueBoroughsFromRoutes(data.routes));
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
            borough.Route = uniqueRoutes.filter(x => borough.borough === x.borough);
        }

        return this.#boroughs;
    }

    getUniqueRoutes() {
        const uniqueRoutes = [];
        const uniqueRouteNames = new Set();

        for(let route of this.#routes) {
            if (uniqueRouteNames.has(route.route_name)) {
                continue;
            }

            uniqueRoutes.push(route);
            uniqueRouteNames.add(route.route_name);
        }

        return uniqueRoutes;
    }

    getBoroughs = () => this.#boroughs;
    getRoutesByName = (routeName) => this.#routes.filter(x => x.route_name === routeName);
}

export const store = new Store(factory);