import { modalBg } from './core/dom/modal-bg';
import { routeDetails } from './core/dom/route-details';
import { store } from './core/store';
import { httpHandler } from './core/http-handler';
import { boroughRenderer } from './core/renderers/borough-renderer';
import { routeRenderer } from './core/renderers/route-renderer';
import { routeDetailsRenderer } from './core/renderers/route-details-renderer';
import { dateDetails } from './core/dom/date-details';
import { notification } from './core/dom/notification';
import { Message } from './core/models/message';

modalBg.init([
    _ => modalBg.hide(),
    _ => routeDetails.hide()]);

routeDetails.closeBtn.init([
    _ => modalBg.hide(),
    _ => routeDetails.hide()]);

// Fetch Data
httpHandler
    .domain( './json_daaset.json' )
    .get( httpHandler.getParameters() )
    .then( responseData => store.load(responseData) )
    .then( _ => store.sortByOrderNum() )
    .then( _ => boroughRenderer.renderBoroughs(store.getBoroughs() ) )
    .then( _ => routeRenderer.renderRoute(store.getUniqueRoutes(), (obj) => {
        
        const selectedRoutes = store.getRoutesByName(obj.id);
        routeDetailsRenderer.renderRoute(selectedRoutes)
            .then( _ => {
                routeDetails.selectedRoute.textContent = selectedRoutes[0].fullName;
                routeDetails.show('70%');
                modalBg.show();
            })
            .then( _ => routeDetailsRenderer.setPercentageFill());
    }))
    .then( _ => routeRenderer.setPercentageFill())
    .then( _ => dateDetails.element.textContent =  store.getDatetime())
    .catch(error => {
        // NOTIFICATION
        notification.show();
        notification.messageList.appendChild(Message(error.message));
    });