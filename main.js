class Displayer {
    constructor(element) {
        if (this.constructor === Displayer) {
            throw new Error('Abstract classe cannot be instantiated.');
        }

        Object.defineProperty(this, 'element', {
            value: element,
            writable: false
        });
    }

    show() { 
        this.element.classList.remove('display-none');
    }

    hide() {
        this.element.classList.add('display-none');
    }
}

const modal = (() => {
    class Modal extends Displayer {
        constructor() {
            super(document.querySelector('.modal-bg'));
        }
    }

    return new Modal();
})();

const uploadBtn = (() => {
    class UploadBtn extends Displayer {
        constructor() {
            const btn = document.querySelector('.upload-file-btn');
            btn.addEventListener('click', function () { fileInput.click() }, false);
            super(btn);
        }
    }

    return new UploadBtn();
})();

const routeDetailContainer = document.querySelector('.route-detail-container');
const routeDetailCloseBtn = document.getElementById('closeRouteDetailBtn').addEventListener('click', () => {
    routeDetailContainer.style.width = 0;
    modal.hide();
});

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
    #evalClass() {
        const percent =  Math.abs(this.percentCompCombined * 100);

        if (percent < 50) {
            return 'red-bg';
        } else if (percent >= 50 && percent < 70) {
            return 'yellow-bg';
        } else if (percent >= 70 && percent < 80) {
            return 'light-green-bg';
        } else if (percent >= 80 && percent < 90) {
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
                <div class="route-label">${ this.fullName.toLowerCase() }</div>
                <div class="outer-progress-bar">
                    <div class="inner-progress-bar ${ this.#evalClass() }"></div>
                    <div class="progress-percent">${ (this.percentCompCombined * 100).toFixed(1) }%</div>
                </div>
            </div>`;
    }
}

class Borough {
    constructor(boroughShortName) {
        this.shortName = boroughShortName;
        this.fullName = boroughMapping[boroughShortName].name;
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
                    <div>${ this.fullName.toLowerCase() }</div>
                </div>
                <div class="route-container">${ routeHtml }</div>
            </div>`;
    }
}

const store = (() => {
    class Store {
        #boroughs = [];
        #routes = [];

        // Stores unique borough into private array property
        #loadBoroughs(data) {
            const uniqueBoroughShortNames = new Set(data.map(x => x.substring(0, 2)));
            this.#boroughs = [...uniqueBoroughShortNames].map(x => new Borough(x));
        }

        #loadRoutes(data) {
            this.#routes = data.map(x => new Route(x.split(',')));
        }

        constructor() {}

        load(data) {
            this.#loadBoroughs( data );
            this.#loadRoutes( data );
        }

        sortByOrderNum() {
            this.#boroughs = this.#boroughs.sort((a, b) => {
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

const renderer = (() => {
    class Renderer {
        #rootElem;
    
        constructor() { }
    
        root(className) {
            this.#rootElem = document.querySelector(className);
            return this;
        }
    
        render(data) {
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
            for(let routeElem of document.getElementsByClassName('route')) {
                routeElem.children[1].children[0].style.width = routeElem.children[1].children[1].innerHTML;
    
                routeElem.addEventListener('click', function() {
                    callback(this);
                });
            }
        }
    }

    return new Renderer();
})();

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

app.run(data => {
    store.load(data);
    store.sortByOrderNum();
    const initialDataset = store.getBoroughsWithUniqueRoutes();

    renderer.root('.borough-container')
        .render( initialDataset ).then(() => { 
            renderer.afterRender(elem => {
                modal.show();
                routeDetailContainer.style.width = '400px';
                const routes = store.getRoutesByName(elem.id);
                renderer.root('.route-detail')
                    .render( routes );
            });
    });

    uploadBtn.hide();
    modal.hide();
});