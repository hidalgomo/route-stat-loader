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

    constructor(routeData) {
        this.borough =              routeData[0];
        this.tier =                 routeData[1];
        this.shortName =            routeData[2];
        this.equipmentId =          routeData[3];
        this.gpsSpecific =          parseFloat(routeData[4], 10);
        this.gpsCombined =          parseFloat(routeData[5], 10);
        this.routeLength =          parseFloat(routeData[6], 10);
        this.percentCompSpecific =  parseFloat(routeData[7], 10);
        this.percentCompCombined =  parseFloat(routeData[8], 10);
        this.fullName = routeMapping[this.shortName];
    }

    template() {
        return `
            <div class="route" id="${ this.shortName }">
                <div class="equipment-label">Equipment: ${ this.equipmentId }</div>
                <div class="route-label">${ this.fullName && this.fullName.toLowerCase() }</div>
                <div class="outer-progress-bar">
                    <div class="inner-progress-bar combined ${ this.#evalClass(this.percentCompCombined) }"></div>
                    <div class="inner-progress-bar specific ${ this.#evalClass(this.percentCompSpecific) }"></div>
                    <div class="progress-percent">
                        <span class="combined-percent">${ (this.percentCompCombined * 100).toFixed(1) }%</span>
                        <span class="specific-percent">${ (this.percentCompSpecific * 100).toFixed(1) }%</span>
                    </div>
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
        #Init() {
            const that = this;
            const fileElem = document.getElementById('fileInput');
            const fileReader = new FileReader();
            fileElem.addEventListener('change', function () {
                if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
                    return;
                }
                const file = fileElem.files[0];
                fileReader.readAsText( file );
            }, false);

            fileReader.onload = function() {
                const data = fileReader.result.split('\n');
                data.shift();
                that.callback( data );
            }
        }

        constructor() {
            this.callback;
            // Certainly the implmentation of the Init method could have been placed here in the construtor.
            // However, if its ever needed to switch the Init method for anothe form of implmetation it
            // can easly be done without having to change anything from the Init method. This follows
            // the OCP (OPen Close Principle) SOLID standards.
            this.#Init();
        }

        run(callback) {
            this.callback = callback;
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

app.uploadBtn = (() => {
    class UploadBtn extends Displayer {
        constructor() {
            super(document.querySelector('.upload-file-btn'));
            this.element.addEventListener('click', () => fileInput.click(), false);
        }

        show() {
            this._show();
        }

        hide() {
            this._hide()
        }
    }

    return new UploadBtn();
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

        // Stores unique borough into private array property
        #loadBoroughs(data) {
            const uniqueBoroughShortNames = new Set(data.map(x => x.substring(0, 2)));

            for(let dataItem of [...uniqueBoroughShortNames]) {
                if (!dataItem) {
                    continue;
                }

                this.#boroughs.push(new Borough(dataItem));
            }
        }

        #loadRoutes(data) {
            for (let dataItem of data) {
                if (!dataItem) {
                    continue;
                }

                this.#routes.push(new Route(dataItem.split(',')));
            }
        }

        constructor() {}

        load(data) {
            this.#boroughs = [];
            this.#routes = [];
            this.#loadBoroughs( data );
            this.#loadRoutes( data );
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
            const addedRouteName = new Set();

            for(let route of this.#routes) {
                if (!addedRouteName.has(route.shortName)) {
                    uniqueRoutes.push(route);
                    addedRouteName.add(route.shortName);
                }
            }

            for (let borough of this.#boroughs) {
                borough.routes = uniqueRoutes.filter(x => borough.shortName === x.borough);
            }

            return this.#boroughs;
        }

        getRoutesByName(name) {
            return this.#routes.filter(x => x.shortName === name);
        }
    }

    return new Store();
})();

app.renderer = (() => {
    class Renderer {
        #rootElem;
    
        constructor() { }
    
        root(className) {
            this.#rootElem = document.querySelector(className);
            return this;
        }
    
        render(data) {
            this.#rootElem.innerHTML = '';
            document.getElementById('fileInput').value = '';

            return new Promise((resolved, rejected) => {
                let html = '';

                for(let x of data) {
                    html += x.template();
                }

                this.#rootElem.innerHTML = html;
                setTimeout(() => resolved(), 100);
            });
        }
    
        afterRender(callback) {
            let innerProgressBar, percent;

            for(let routeElem of this.#rootElem.getElementsByClassName('route')) {
                if (callback) {
                    routeElem.addEventListener('click', function() {
                        callback(this);
                    });
                    innerProgressBar = routeElem.getElementsByClassName('inner-progress-bar')[0];
                    percent = routeElem.querySelector('.combined-percent').innerHTML;
                } else {
                    innerProgressBar = routeElem.getElementsByClassName('inner-progress-bar')[1];
                    percent = routeElem.querySelector('.specific-percent').innerHTML;
                }

                innerProgressBar.style.width = percent;
            }
        }
    }

    return new Renderer();
})();

app.startUploadBtn.init([
    () => app.modal.show(),
    () => app.uploadBtn.show(),
    () => app.uploadBtn.element.click()
]);

app.modal.init([
    () => app.uploadBtn.hide(),
    () => app.routeDetailModal.hide()
]);

app.routeDetailModal.closeBtn.init([
    () => app.modal.hide(),
    () => app.routeDetailModal.hide()
])

app.run(data => {
    app.store.load(data);
    app.store.sortByOrderNum();
    const initialDataset = app.store.getBoroughsWithUniqueRoutes();

    app.renderer.root('.borough-container')
        .render( initialDataset ).then(() => {

            // display selected route details
            app.renderer.afterRender(elem => {
                const routes = app.store.getRoutesByName(elem.id);
                app.renderer.root('.route-detail').render( routes );
                app.renderer.afterRender();

                app.routeDetailModal.selectedRouteElem.element.textContent = routes[0].fullName;
                app.routeDetailModal.show();
                app.modal.show();
            });
    });

    app.uploadBtn.hide();
    app.modal.hide();
});