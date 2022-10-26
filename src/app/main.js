import { modalBg } from './core/dom/modal-bg';
import { routeDetails } from './core/dom/route-details';
import { store } from './core/store';
import { httpHandler } from './core/http-handler';
import { boroughRenderer } from './core/renderers/borough-renderer';
import { routeRenderer } from './core/renderers/route-renderer';
import { routeDetailsRenderer } from './core/renderers/route-details-renderer';
import { dateDetails } from './core/dom/date-details';

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
    .then( () => dateDetails.element.innerHTML =  store.getDatetime())
    .catch(error => {
        // ERROR MESSAGE
        // NOTIFICATION
    });