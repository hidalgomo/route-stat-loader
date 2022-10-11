/**
 * The Artifact class is a non-instantiable (abstract) class that provides minimal reusability for
 * the parameters passed via the extended constructor.
 */
class Artifact {

    /**
     * 
     * @param {[Element]} element stores a DOM element for sub-classes to utilize. This property
     * cannot be modified once it is set (non-writable).
     */
    constructor(element) {
        if (this.constructor === Displayer) {
            throw new Error('Abstract class cannot be instantiated.');
        }

        Object.defineProperty(this, 'element', {
            value: element,
            writable: false
        });
    }
}

/**
 * The Displayer class is uninstatiable (abstract) class that provides reusability to sub-classes whose focus
 * is either hiding (set display to none) or showing the specified HTML element.
 */
class Displayer extends Artifact {

    /**
     * @param { [Element] } element stores DOM element that will either be hidden or shown.
     */
    constructor(element) {
        super(element);

        if (this.constructor === Displayer) {
            throw new Error('Abstract class cannot be instantiated.');
        }
    }

    /**
     * Thi method performs a class removal of the specified element. The method removes
     * a class name that holds styles such as display none in order to hide the element.
     */
    _show() { 
        this.element.classList.remove('display-none');
    }

    /**
     * This method performs a class addition of the specified element. The method adds
     * a class name that holds styles such as display none in order to hide the element.
     */
    _hide() {
        this.element.classList.add('display-none');
    }
}

class Slider extends Artifact {
    constructor(element) {
        super(element);

        if (this.constructor === Displayer) {
            throw new Error('Abstract class cannot be instantiated.');
        }
    }

    _show(width) {
        this.element.style.width = width;
    }

    _hide() {
        this.element.style.width = 0;
    }
}

const boroughMapping = {
    MB: { name: 'Manhattan-Bronx', orderNum: 1 },
    BQ: { name: 'Brooklyn-Queens', orderNum: 2 },
    SI: { name: 'Staten Island', orderNum: 3 }
};

const routeMapping = {
    BQ_99_RH_H101: 'Belt Parkway',
    MB_99_RH_H101: 'Bronx River Parkway',
    BQ_99_RH_H102: 'Brooklyn Queens Expressway',
    MB_99_RH_H102: 'Bruckner Expressway',
    BQ_99_RH_H103: 'Clearview Expressway',
    MB_99_RH_H103: 'Cross Bronx Expressway',
    BQ_99_RH_H104: 'Cross Island Parkway',
    SI_99_RH_H101: 'Dr M L King Jr Expressway',
    MB_99_RH_H104: 'Franklin D Roosevelt Drive',
    BQ_99_RH_H105: 'Gowanus Expressway',
    BQ_99_RH_H106: 'Grand Central Parkway',
    MB_99_RH_H105: 'Harlem River Drive',
    MB_99_RH_H106: 'Henry Hudson Parkway',
    MB_99_RH_H107: 'Hutchinson River Parkway',
    BQ_99_RH_H107: 'Jackie Robinson Parkway',
    SI_99_RH_H102: 'Korean War Vets Parkway',
    BQ_99_RH_H108: 'Long Island Expressway',
    MB_99_RH_H108: 'Major Deegan Expressway',
    MB_99_RH_H109: 'Mosholu Parkway',
    BQ_99_RH_H109: 'Nassau Expressway',
    MB_99_RH_H110: 'Pelham Parkway',
    BQ_99_RH_H110: 'Prospect Expressway',
    MB_99_RH_H111: 'Sheridan Boulevard',
    SI_99_RH_H103: 'Staten Island Expressway',
    BQ_99_RH_H111: 'Van Wyck Expressway',
    SI_99_RH_H104: 'West Shore Expressway'
};

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

app.Route = function(route) {
    Object.assign(this, route);
    this.fullName = routeMapping[this.route_name];

    var evalClass = (percent) => {
        const calcPercent =  Math.abs(percent * 100);

        if (calcPercent < 50) {
            return 'red-bg';
        } else if (calcPercent >= 50 && calcPercent < 70) {
            return 'yellow-bg';
        } else if (calcPercent >= 70 && calcPercent < 80) {
            return 'light-green-bg';
        } else if (calcPercent >= 80 && calcPercent < 90) {
            return 'mid-green-bg';
        } else {
            return 'dark-green-bg';
        }
    }

    this.template = (labelPropName = 'fullName', percentPropName = 'pctcomp_combined') => {
        return `
            <div class="route" id="${ this.route_name }" title="${ this[labelPropName] }">
                <div class="route-label">${ this[labelPropName] }</div>
                <div class="outer-progress-bar">
                    <div class="inner-progress-bar ${ evalClass(this[percentPropName]) }"></div>
                    <div class="progress-percent">${ (this[percentPropName] * 100).toFixed(1) }%</div>
                </div>
            </div>`;
    }
};

app.Borough = function(boroughShortName) {
    this.shortName = boroughShortName;
    this.fullName = boroughMapping[boroughShortName] && boroughMapping[boroughShortName].name;
    this.routes = [];

    this.template = () => {
        let routeHtml = '';
        for (let route of this.routes) {
            routeHtml += route.template();
        }

        return `
            <div class="borough">
                <div class="borough-label">
                    <div>${ this.fullName && this.fullName.toLowerCase() }</div>
                </div>
                <div class="route-container">${ routeHtml }</div>
            </div>`;
    }
};

app.factory = (() => {
    class Factory {
        create(className, parameters) {
            // There is minor pollution of the global scope regarding the below code.
            // A namespace is needed to avoid polluting the global scope and possible code re-structuring.
            return new app[className](parameters);
        }
    }

    return new Factory();
})();
 
app.modal = (() => {
    class Modal extends Displayer {

        executables = [];

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
        executables = [];
        
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
    executables = [];
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

app.store = (() => {
    class Store {
        #factory;
        #boroughs = [];
        #routes = [];

        #extractUniqueBoroughNamesFromRoutes(routes) {
            return [...new Set(routes.map(x => x.borough))];
        }

        #loadBoroughs(uniqueBoroughNames) {
            return uniqueBoroughNames.map(boroughShortName => this.#factory.create('Borough', boroughShortName));
        }

        #loadRoutes(routes) {
             return routes.map(route => this.#factory.create('Route', route));
        }

        constructor(factory) {
            this.#factory = factory;
        }

        load(data) {
            this.#boroughs = this.#loadBoroughs(this.#extractUniqueBoroughNamesFromRoutes(data.routes));
            this.#routes = this.#loadRoutes(data.routes);
        }

        sortByOrderNum() {
            this.#boroughs = this.#boroughs.sort((a, b) => {
                if (!boroughMapping[a.shortName] || !boroughMapping[b.shortName]) {
                    return 1;
                }

                return boroughMapping[a.shortName].orderNum < boroughMapping[b.shortName].orderNum? -1 : 1;
            });
        }

        getBoroughsWithUniqueRoutes() {
            const uniqueRoutes = [];
            const uniqueRouteNames = new Set();

            for(let route of this.#routes) {
                if (uniqueRouteNames.has(route.route_name)) {
                    continue;
                }

                uniqueRoutes.push(route);
                uniqueRouteNames.add(route.route_name);
            }

            for (let borough of this.#boroughs) {
                borough.routes = uniqueRoutes.filter(x => borough.shortName === x.borough);
            }

            return this.#boroughs;
        }

        getRoutesByName(routeName) {
            return this.#routes.filter(x => x.route_name === routeName);
        }
    }

    // Dependency injection of the factory object
    return new Store(app.factory);
})();

app.renderer = (() => {
    class Renderer {
        #rootElem;
        #dataSet;
    
        constructor() { }

        init(parentIdentifier, dataSet) {
            this.#rootElem = document.querySelector(parentIdentifier);
            this.#dataSet = dataSet;
            return this;
        }

        async render(callback) {
            this.#rootElem.innerHTML = '';

            return await new Promise((resolved, rejected) => {
                for(let obj of this.#dataSet) {
                    this.#rootElem.innerHTML += callback(obj);
                }
                setTimeout(() => resolved(), 100);
            });
        }
    
        // Violates the single responsibility principle
        // This method is performing two things

        // possible sulution to decouple further would be to seperate
        // renderer from element modifier (modifier includes event adding)
        afterRender(callback) {
            let innerProgressBar, percent;

            for(let routeElem of this.#rootElem.getElementsByClassName('route')) {
                if (callback) {
                    routeElem && routeElem.addEventListener('click', function() { callback(this); });
                }

                percent = routeElem.querySelector('.progress-percent').innerHTML;
                innerProgressBar = routeElem.querySelector('.inner-progress-bar');
                innerProgressBar.style.width = percent;
            }
        }
    }

    return new Renderer();
})();

app.httpHandler = (() => {
    class HttpHandler {
        constructor() { }

        getParameters() {
            let parameters = window.location.hash.substring(1);
            return `?${ parameters }`;
        }

        async get(url) {
            return await fetch(url)
                .then(response => response.json());
        }
    }

    return new HttpHandler();
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
    const apiUri = domain + app.httpHandler.getParameters();

    app.httpHandler.get( apiUri ).then((responseData) => {
        
        app.store.load( responseData );
        app.store.sortByOrderNum();
        const initialDataset = app.store.getBoroughsWithUniqueRoutes();
        
        app.renderer
            .init('.borough-container', initialDataset)
            .render(obj => obj.template())
            .then(() => {
                
                app.renderer
                    .afterRender(elem => {

                        const routes = app.store.getRoutesByName(elem.id);

                        app.renderer
                            .init('.route-detail', routes)
                            .render(obj => obj.template('equipment_id', 'pctcomp_specific'))
                            .then(() => {
                                app.renderer.afterRender();
                                app.routeDetailModal.selectedRouteElem.element.textContent = routes[0].fullName;
                                app.routeDetailModal.show();
                                app.modal.show();
                        });
                });
        });
    });
});
