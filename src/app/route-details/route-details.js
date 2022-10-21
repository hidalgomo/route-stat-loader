import { Artifact } from '../core/artifact';
import { Slider } from '../core/slider';

class RouteDetails extends Slider {
    constructor() {
        super(document.querySelector('.route-detail-container'));
    }

    show = () => this._show('70%');
    hide = () => this._hide();
}

class SelectedRoute extends Artifact {
    constructor() {
        super(document.querySelector('.selected-route-label'));
    }
}

class CloseBtn extends Artifact {
    constructor() {
        super(document.getElementById('closeRouteDetailBtn'));
        this.element && this.element.addEventListener('click', () => this.executables.forEach(x => x()));
    }

    init = (executables) => this.executables = executables;
}

const routeDetails = new RouteDetails();
routeDetails.selectedRoute = new SelectedRoute();
routeDetails.closeBtn = new CloseBtn();

export { routeDetails };