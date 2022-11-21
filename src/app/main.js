import { modalBg } from './core/dom/modal-bg';
import { routeDetails } from './core/dom/route-details';
import { store } from './core/store';
import { httpHandler } from './core/http-handler';
import { boroughRenderer } from './core/renderers/borough-renderer';
import { routeRenderer } from './core/renderers/route-renderer';
import { routeDetailsRenderer } from './core/renderers/route-details-renderer';
import { dateDetails } from './core/dom/date-details';
import { routeMapLink } from './core/dom/route-map-link';

modalBg.init([
    _ => modalBg.hide(),
    _ => routeDetails.hide()]);

routeDetails.closeBtn.init([
    _ => modalBg.hide(),
    _ => routeDetails.hide()]);

// Fetch Data
httpHandler
    .domain( './json_dataset.json' )
    .getAsync( httpHandler.getParameters() )
    .then( (responseData) => store.load(responseData) )
    .then( _ => store.sortByOrderNum() )
    .then( _ => boroughRenderer.renderBoroughsAsync(store.getBoroughs() ) )
    .then( _ => routeRenderer.renderRouteAsync(store.getUniqueRoutes(), (obj) => {
        
        const selectedRoutes = store.getRoutesByName(obj.id);
        routeDetailsRenderer.renderRouteAsync(selectedRoutes)
            .then( _ => {
                routeDetails.selectedRoute.element.textContent = selectedRoutes[0].fullName;
                routeDetails.show();
                modalBg.show();
            })
            .then( _ => routeDetailsRenderer.setPercentageFill());
    }))
    .then( _ => routeRenderer.setPercentageFill())
    .then( _ => {
        dateDetails.element.textContent =  store.getDatetime();
        // routeMapLink.element.href = store.getRouteMapLink();
    })
    .catch(error => {
        // NOTIFICATION
        console.error(error);
    });