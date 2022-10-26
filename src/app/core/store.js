import { boroughMapping } from './models/mappings';
import { factory } from './factory';
class Store {
    #factory;
    #boroughs = [];
    #routes = [];
    #datesRange;

    #extractUniqueBoroughsFromRoutes(routes) {
        return [...new Set(routes.map(x => x.borough))]
            .map(boroughName => routes.find(route => route.borough === boroughName));
    }

    #loadBoroughs(uniqueBorough) {
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
        this.#datesRange = `${ data.startStamp.date } ${ data.startStamp.time } - ${ data.endStamp.date } ${ data.endStamp.time }`;
    }

    sortByOrderNum() {
        this.#boroughs = this.#boroughs.sort((a, b) => {
            if (!boroughMapping[a.shortName] || !boroughMapping[b.shortName]) {
                return 1;
            }

            return boroughMapping[a.shortName].orderNum < boroughMapping[b.shortName].orderNum? -1 : 1;
        });
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
    getDatetime = () => this.#datesRange;
}

export const store = new Store(factory);