import { modalBg } from './modal-bg/modal-bg';
import { routeDetails } from './route-details/route-details';
import { store } from './core/store';
import { renderer } from './core/renderer';
import { httpHandler } from './core/httpHandler';

modalBg.init([
    () => routeDetails.hide()]);

routeDetails.closeBtn.init([
    () => modalBg.hide(),
    () => routeDetails.hide()]);

httpHandler
    .domain( './json_dataset.json' )
    .getAsync( httpHandler.getParameters() )
    .then( (responseData) => store.load(responseData) )
    .then( () => store.sortByOrderNum() )
    .then( () => store.getBoroughsWithUniqueRoutes() )
    .then( (initialDataset) => {
    
        renderer
            .init('.borough-container', initialDataset)
            .renderAsync(obj => obj.template())
            .then(() => {
                
                renderer
                    .afterRender(elem => {

                        const routes = store.getRoutesByName(elem.id);

                        renderer
                            .init('.route-detail', routes)
                            .renderAsync(obj => obj.template('equipment_id', 'pctcomp_specific'))
                            .then(() => {
                                renderer.afterRender();
                                routeDetails.selectedRoute.element.textContent = routes[0].fullName;
                                routeDetails.show();
                                modalBg.show();
                        });
                });
        });
});
