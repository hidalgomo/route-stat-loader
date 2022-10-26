import { RouteRenderer } from "./route-renderer";

class RouteDetailsRenderer extends RouteRenderer {
    
    getContainer = () => document.getElementById('routeDetail');

    renderRouteAsync = async (routes) => {
        this.getContainer().innerHTML = '';
        await this.renderAsync(this.getContainer, routes, obj => obj.template('equipment_id', 'pctcomp_specific'));
    }
}

export const routeDetailsRenderer = new RouteDetailsRenderer();