class Artifact {
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

class Displayer extends Artifact {
    constructor(element) {
        super(element);

        if (this.constructor === Displayer) {
            throw new Error('Abstract class cannot be instantiated.');
        }
    }

    _show() { 
        this.element.classList.remove('display-none');
    }

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
    BQ_99_RH_H101: 'BELT PARKWAY',
    MB_99_RH_H101: 'BRONX RIVER PARKWAY',
    BQ_99_RH_H102: 'BROOKLYN QUEENS EXPRESSWAY',
    MB_99_RH_H102: 'BRUCKNER EXPRESSWAY',
    BQ_99_RH_H103: 'CLEARVIEW EXPRESSWAY',
    MB_99_RH_H103: 'CROSS BRONX EXPRESSWAY',
    BQ_99_RH_H104: 'CROSS ISLAND PARKWAY',
    SI_99_RH_H101: 'DR M L KING JR EXPRESSWAY',
    MB_99_RH_H104: 'FRANKLIN D ROOSEVELT DRIVE',
    BQ_99_RH_H105: 'GOWANUS EXPRESWAY',
    BQ_99_RH_H106: 'GRAND CENTRAL PARKWAY',
    MB_99_RH_H105: 'HARLEM RIVER DRIVE',
    MB_99_RH_H106: 'HENRY HUDSON PARKWAY',
    MB_99_RH_H107: 'HUTCHINSON RIVER PARKWAY',
    BQ_99_RH_H107: 'JACKIE ROBINSON PARKWAY',
    SI_99_RH_H102: 'KOREAN WAR VETS PARKWAY',
    BQ_99_RH_H108: 'LONG ISLAND EXPRESSWAY',
    MB_99_RH_H108: 'MAJOR DEEGAN EXPRESSWAY',
    MB_99_RH_H109: 'MOSHOLU PARKWAY',
    BQ_99_RH_H109: 'NASSAU EXPRESSWAY',
    MB_99_RH_H110: 'PELHAM PARKWAY',
    BQ_99_RH_H110: 'PROSPECT EXPRESSWAY',
    MB_99_RH_H111: 'SHERIDAN BOULEVARD',
    SI_99_RH_H103: 'STATEN ISLAND EXPRESSWAY',
    BQ_99_RH_H111: 'VAN WYCK EXPRESSWAY',
    SI_99_RH_H104: 'WEST SHORE EXPRESSWAY'
};

class Route {
    #evalClass(percent) {
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

    constructor(route) {
        Object.assign(this, route);
        this.fullName = routeMapping[this.route_name];
    }

    template(labelPropName = 'fullName', percentPropName = 'pctcomp_combined') {
        return `
            <div class="route" id="${ this.route_name }">
                <div class="route-label">${ this[labelPropName] && this[labelPropName].toLowerCase()  }</div>
                <div class="outer-progress-bar">
                    <div class="inner-progress-bar ${ this.#evalClass(this[percentPropName]) }"></div>
                    <div class="progress-percent">${ (this[percentPropName] * 100).toFixed(1) }%</div>
                </div>
            </div>`;
    }
}

class Borough {
    constructor(boroughShortName) {
        this.shortName = boroughShortName;
        this.fullName = boroughMapping[boroughShortName] && boroughMapping[boroughShortName].name;
        this.routes = [];
    }

    template() {
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
}

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

        executables = [];

        constructor() {
            super(document.querySelector('.modal-bg'));
            this.element.addEventListener('click', () => this.hide());
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
            this.element.addEventListener('click', () => this.executables.map(x => x()));
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
            this.element.addEventListener('click', () => this.executables.map(x => x()));
        }

        init(executables) {
            this.executables = [...executables];
        }
    }

    return new RouteModalCloseBtn();
})();

app.store = (() => {
    class Store {
        #boroughs = [];
        #routes = [];

        #extractUniqueBoroughNamesFromRoutes(routes) {
            return [...new Set(routes.map(x => x.borough))];
        }

        #loadBoroughs(uniqueBoroughNames) {
            return uniqueBoroughNames.map(boroughName => new Borough(boroughName));
        }

        #loadRoutes(routes) {
            return routes.map(route => new Route(route));
        }

        constructor() {}

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

    return new Store();
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

        render(callback) {
            this.#rootElem.innerHTML = '';

            return new Promise((resolved, rejected) => {
                for(let obj of this.#dataSet) {
                    this.#rootElem.innerHTML += callback(obj);
                }
                setTimeout(() => resolved(), 100);
            });
        }
    
        // Violates the single responsibility principle
        // This method is performing two things
        afterRender(callback) {
            let innerProgressBar, percent;

            for(let routeElem of this.#rootElem.getElementsByClassName('route')) {
                if (callback) {
                    routeElem.addEventListener('click', function() {
                        callback(this);
                    });
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
        #http = new XMLHttpRequest();

        constructor() { }

        get(url, parameters) {
            const that = this.#http;
            return new Promise((resolved, rejected) => {
                that.open('GET', url);
                that.setRequestHeader('Cache-Control', 'no-cache');
                that.send();

                that.onreadystatechange = function() {
                    if (this.readyState === 4 && this.status === 200) {
                        resolved(JSON.parse(that.responseText));
                    }
                }
            });
        }
    }

    return new HttpHandler();
})();

app.startUploadBtn.init([ () => app.modal.show() ]);
app.modal.init([ () => app.routeDetailModal.hide() ]);
app.routeDetailModal.closeBtn.init([
    () => app.modal.hide(),
    () => app.routeDetailModal.hide()
]);

app.run(() => {

    const apiUri = './json_dataset.json';

    app.httpHandler.get( apiUri, {  } ).then((responseData) => {
        
        app.store.load( responseData );
        app.store.sortByOrderNum();
        const initialDataset = app.store.getBoroughsWithUniqueRoutes();
        
        app.renderer
            .init('.borough-container', initialDataset)
            .render(obj => obj.template()).then(() => {
                app.renderer.afterRender(elem => {
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