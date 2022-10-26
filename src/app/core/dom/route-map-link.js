import { Artifact } from "./artifact";

class RouteMapLink extends Artifact {
    constructor() {
        super(document.querySelector('.route-map-link'));
    }
}

export const routeMapLink = new RouteMapLink();