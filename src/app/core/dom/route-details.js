import { Artifact } from './artifact';
import { Slider } from './slider';

class RouteDetails extends Slider {
    constructor() {
        super(document.querySelector('.route-detail-container'));
    }
}

class CloseBtn extends Artifact {
    constructor() {
        super(document.getElementById('closeRouteDetailBtn'));
        this.element && this.element.addEventListener('click', () => this.executables.forEach(x => x()));
    }

    init = (executables) => this.executables = executables;
}

const routeDetailsObj = new RouteDetails();
routeDetailsObj.selectedRoute = routeDetailsObj.element.querySelector('.selected-route-label');
routeDetailsObj.closeBtn = new CloseBtn();
export const routeDetails = routeDetailsObj;
