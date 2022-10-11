import { modalBg } from './modal-bg/modal-bg.js';
import { routeDetails } from './route-details/route-details.js';
import { store } from './core/store.js';
import { renderer } from './core/renderer.js';
import { httpHandler } from './core/httpHandler.js';

const app = (() => {
    class App {
        constructor() { }

        run(callback) {
            // run on window load
            window.onload = () => {
                callback();
            };
        }
    }

    return new App();
})();

modalBg.init([
    () => routeDetails.hide()]);

routeDetails.closeBtn.init([
    () => modalBg.hide(),
    () => routeDetails.hide()]);

app.run(() => {
    // Example: http://ip_or_domainName:port/
    const domain = './json_dataset.json';
    // do not change
    const apiUri = domain + httpHandler.getParameters();

    httpHandler.getAsync( apiUri ).then((responseData) => {
        
        store.load( responseData );
        store.sortByOrderNum();
        const initialDataset = store.getBoroughsWithUniqueRoutes();
        
        renderer
            .init('.borough-container', initialDataset)
            .render(obj => obj.template())
            .then(() => {
                
                renderer
                    .afterRender(elem => {

                        const routes = store.getRoutesByName(elem.id);

                        renderer
                            .init('.route-detail', routes)
                            .render(obj => obj.template('equipment_id', 'pctcomp_specific'))
                            .then(() => {
                                renderer.afterRender();
                                routeDetails.selectedRoute.element.textContent = routes[0].fullName;
                                routeDetails.show();
                                modalBg.show();
                        });
                });
        });
    });
});
