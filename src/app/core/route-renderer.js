import { Renderer } from "./renderer";

export class RouteRenderer extends Renderer {

    // TODO:
    // improvement would be to store already retreived container in memory
    getContainer = (route) =>  {
        let container = route ? document.getElementById(route.borough) : document;
        container = container.querySelectorAll('.route-container');
        return route ? container[0] : container;
    }

    getRoutesFromContainers(containerList) {
        const routes = [];
        containerList.forEach(container => routes.push(...container.children));
        return routes;
    }

    setPercentageFill() {
        let containers = this.getContainer();
        containers = containers.tagName ? [containers] : containers;
        const routes = this.getRoutesFromContainers(containers);

        let innerProgressBar, percent;
        for(let route of routes) {
            percent = route.querySelector('.progress-percent').innerHTML;
            innerProgressBar = route.querySelector('.inner-progress-bar');
            innerProgressBar.style.width = percent;
        }
    }
            
    async renderRouteAsync(routes, eventCallback) {
        await this.renderAsync(this.getContainer, routes, route => route.template(undefined, undefined, eventCallback));
    }
}

export const routeRenderer = new RouteRenderer();