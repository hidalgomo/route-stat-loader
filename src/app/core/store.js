import { boroughMapping } from './models/mappings';
import { factory } from './factory';
class Store {
    #factory;
    #boroughs = [];
    #routes = [];
    #routeMapLink;

    #dateTimeStamp = {
        start: null,
        end: null
    };

    #extractUniqueBoroughsFromRoutes(routes) {
        return [...new Set(routes.map(x => x.borough))]
            .map(boroughName => routes.find(route => route.borough === boroughName));
    }

    #loadBoroughs = (uniqueBorough) => uniqueBorough.map(borough => this.#factory.create('Borough', borough))
    #loadRoutes = (routes) => routes.map(route => {
        route.dateTimeStamp = this.#dateTimeStamp;
        return this.#factory.create('Route', route);
    });

    constructor(factory) {
        this.#factory = factory;
    }

    load(data) {
        this.#boroughs = this.#loadBoroughs(this.#extractUniqueBoroughsFromRoutes(data.routes));
        this.#routes = this.#loadRoutes(data.routes);
        this.#dateTimeStamp.start = `${ data.startStamp.date } ${ data.startStamp.time }`;
        this.#dateTimeStamp.end = `${ data.endStamp.date } ${ data.endStamp.time }`;
        this.#routeMapLink = `http://10.175.10.171:5000/map_by_route?hashed_timeframe=${ data.hashedTimeframe }&hashed_assignment=${ data.hashedAssignment }`;
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
    getDatetime = () => `${ this.#dateTimeStamp.start } - ${ this.#dateTimeStamp.end }`;
    getRouteMapLink = () => this.#routeMapLink;
}

export const store = new Store(factory);