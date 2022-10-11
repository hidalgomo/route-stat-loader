import { Artifact } from './core/artifact.js';
import { Displayer } from './core/displayer.js';
import { Slider } from './core/slider.js';
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

app.modal = (() => {
    class Modal extends Displayer {
        constructor() {
            super(document.querySelector('.modal-bg'));
            this.element && this.element.addEventListener('click', () => this.hide());
        }

        init(executables) {
            this.executables = [...executables];
        }

        show() {
            this._show();
        }

        hide() {
            this._hide();
            this.executables.map(x => x());
        }
    }

    return new Modal();
})();

app.startUploadBtn = (() => {
    class StartUploadBtn extends Artifact {        
        constructor() {
            super(document.getElementById('startUploadBtn'));
            this.element && this.element.addEventListener('click', () => this.executables.map(x => x()));
        }

        init(executables) {
            this.executables = [...executables];
        }
    }

    return new StartUploadBtn();
})();

app.routeDetailModal = (() => {
    class RouteDetailModal extends Slider {
        constructor() {
            super(document.querySelector('.route-detail-container'));
        }

        show() {
            this._show('70%');
        }

        hide() {
            this._hide();
        }
    }

    return new RouteDetailModal();
})();

app.routeDetailModal.selectedRouteElem = (() => {
    class SelectedRouteElem extends Artifact {
        constructor() {
            super(document.querySelector('.selected-route-label'));
        }
    }

    return new SelectedRouteElem();
})();

app.routeDetailModal.closeBtn = (() => {
    class RouteModalCloseBtn extends Artifact {
        constructor() {
            super(document.getElementById('closeRouteDetailBtn'));
            this.element && this.element.addEventListener('click', () => this.executables.map(x => x()));
        }

        init(executables) {
            this.executables = [...executables];
        }
    }

    return new RouteModalCloseBtn();
})();

app.startUploadBtn.init([
    () => app.modal.show()]);

app.modal.init([
    () => app.routeDetailModal.hide()]);

app.routeDetailModal.closeBtn.init([
    () => app.modal.hide(),
    () => app.routeDetailModal.hide()]);

app.run(() => {
    // Example: http://ip_or_domainName:port/
    const domain = './assets/json_dataset.json';
    // do not change
    const apiUri = domain + httpHandler.getParameters();

    httpHandler.get( apiUri ).then((responseData) => {
        
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
                                app.routeDetailModal.selectedRouteElem.element.textContent = routes[0].fullName;
                                app.routeDetailModal.show();
                                app.modal.show();
                        });
                });
        });
    });
});
