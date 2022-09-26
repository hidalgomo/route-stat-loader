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

class BoroughTemplate {
    Create(borough) {
        const parentElem = document.createElement('div');
        parentElem.classList.add('borough');

        let routeHtml = '';
        for (let route of borough.routes) {
            routeHtml += route.template().Create(route);
        }

        parentElem.innerHTML = `
            <div class="borough-label">
                <div>${ borough.fullName.toLowerCase() }</div>
            </div>
            <div class="route-container">${ routeHtml }</div>`;
        return parentElem;
    }
}

class RouteTemplate {
    #evalClass(route) {
        const percent = route.percentCompCombined * 100;

        if (percent > 50 && percent < 80) {
            return 'yellow-bg';
        } else if (percent < 50) {
            return 'red-bg';
        } else {
            return 'green-bg';
        }
    }

    Create(route) {
        return `
            <div class="route">
                <div class="route-label">${ route.fullName.toLowerCase() }</div>
                <div class="outer-progress-bar">
                    <div class="inner-progress-bar ${ this.#evalClass( route ) }"></div>
                    <div class="progress-percent">${ (route.percentCompCombined * 100).toFixed(1) }%</div>
                </div>
            </div>`;
    }
}

// Utilize the factory pattern to comply with DIP (Dependency Inversion Principle).
const TemplateFactory = {
    CreateRouteTemplate: () => { return new RouteTemplate() },
    CreateBoroughTemplate: () => { return new BoroughTemplate() }
};

class Route {
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
        this.template = TemplateFactory.CreateRouteTemplate;
    }
}

class Borough {
    constructor(boroughShortName) {
        this.shortName = boroughShortName;
        this.fullName = boroughMapping[boroughShortName].name;
        this.routes = [];
        this.template = TemplateFactory.CreateBoroughTemplate;
    }
}

// store should not couple borough with route so tightly. it should be loosly coupled for better flexibility.
// Saparating borough from routes allows for a more flexible lookup and connecting based on reference thereafter.
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

    Load(data) {
        this.#loadBoroughs( data );
        this.#loadRoutes( data );
    }

    SortByOrderNum() {
        this.#boroughs = this.#boroughs.sort((a, b) => {
            return boroughMapping[a.shortName].orderNum < boroughMapping[b.shortName].orderNum? -1 : 1;
        });
    }

    GetBoroughsWithUniqueRoutes() {
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

    GetRoutesByBoroughShortName(boroughShortName) {
        return this.#routes.filter(x => x.borough === boroughShortName);
    }
}

class Renderer {
    #rootElem;

    constructor(className) {
        this.#rootElem = document.querySelector(className);
    }

    Render(data) {
        data.map(x => {
            this.#rootElem.appendChild( x.template().Create(x) );
        });
    }

    FillProgress() {
        setTimeout(() => {
            for(let node of document.getElementsByClassName('outer-progress-bar')) {
                node.children[0].style.width = node.children[1].innerHTML;
            }  
        }, 100);
    }
}

class Engine {

    #uploadBtn;
    #modalBg;

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
        this.#uploadBtn = document.querySelector('.upload-file-btn');
        this.#modalBg = document.querySelector('.modal-bg');
        this.#uploadBtn.addEventListener('click', function () { fileInput.click() }, false);

        this.#Init();
    }

    // Start methods sets a set of callbacks that perform a specific task on data being loaded.
    Start(callback) {
        this.callback = callback;
    }

    HideUploadBtn() {
        this.#uploadBtn.classList.add('display-none');
    }

    HideModalBg() {
        this.#modalBg.classList.add('display-none');
    }
}

const engine = new Engine();

engine.Start(data => {

    const store = new Store();
    store.Load(data);
    store.SortByOrderNum();
    const initialDataset = store.GetBoroughsWithUniqueRoutes();

    const renderer = new Renderer('.borough-container');
    renderer.Render( initialDataset );
    renderer.FillProgress();

    engine.HideUploadBtn();
    engine.HideModalBg();
});