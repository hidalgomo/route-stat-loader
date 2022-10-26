import { modalBg } from './modal-bg/modal-bg';
import { routeDetails } from './route-details/route-details';
import { store } from './core/store';
import { httpHandler } from './core/http-handler';
import { boroughRenderer } from './core/borough-renderer';
import { routeRenderer } from './core/route-renderer';
import { routeDetailsRenderer } from './core/route-details-renderer';

modalBg.init([
    () => modalBg.hide(),
    () => routeDetails.hide()]);

routeDetails.closeBtn.init([
    () => modalBg.hide(),
    () => routeDetails.hide()]);

// Fetch Data
httpHandler
    .domain( './json_dataset.json' )
    .getAsync( httpHandler.getParameters() )
    .then( (responseData) => store.load(responseData) )
    .then( () => store.sortByOrderNum() )
    .then( () => store.getBoroughs() )
    .then( (boroughs) => boroughRenderer.renderBoroughsAsync(boroughs) )
    .then( () => store.getUniqueRoutes())
    .then( (routes) => routeRenderer.renderRouteAsync(routes, (obj) => {
        
        routeDetailsRenderer.renderRouteAsync(store.getRoutesByName(obj.id))
            .then(() => {
                routeDetails.selectedRoute.element.textContent = routes[0].fullName;
                routeDetails.show();
                modalBg.show();
            })
            .then(() => routeDetailsRenderer.setPercentageFill());
    }))
    .then( () => routeRenderer.setPercentageFill())
    .catch(error => {
        // ERROR MESSAGE
        // NOTIFICATION
    });