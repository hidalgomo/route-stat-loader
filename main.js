const Engine = (() => {

    const boroughNameMapping = {
        BQ: 'Brooklyn-Queens',
        MB: 'Manhattan-Bronx',
        SI: 'Staten Island'
    };

    const routeNameMapping = {
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

    class RouteInfo {
        constructor(data) {
            this.borough = data[0];
            this.tier = data[1];
            this.shortName = data[2];
            this.equipmentId = data[3];
            this.gpsSpecific = parseFloat(data[4], 10);
            this.gpsCombined = parseFloat(data[5], 10);
            this.routeLength = parseFloat(data[6], 10);
            this.percentCompSpecific = parseFloat(data[7], 10);
            this.percentCompCombined = parseFloat(data[8], 10);
            this.fullName = routeNameMapping[this.shortName];
        }
    }

    class BoroughInfo {
        constructor(boroughShortName) {
            this.shortName = boroughShortName;
            this.fullName = boroughNameMapping[boroughShortName];
            this.routes = [];
        }   

        // NotImplemented!!
        // The AddRoute method only adds routeInfo to the routes array
        // if, and only if, both the short borough name in the routeInfo being passed
        // is equal to the short borough name passed to the contructor initially.
        addRoute(routeInfo) {
            this.routes.push(routeInfo);
        }
    }

    class BoroughList {
        constructor() {
            this.boroughs = [];
        }

        getBorough(boroughShortName) {
            return this.boroughs.find(x => x.shortName === boroughShortName);
        }

        addBorough(boroughInfo) {
            this.boroughs.push(boroughInfo);
        }
    }

    const boroughList = new BoroughList();
    const container = document.querySelector('.stat-container');
    let routesAddedToDOM = [];

    function routeElemCreator(route) {
        const statItem = document.createElement('div');
        const statLabel = document.createElement('div');
        const statBufferOuter = document.createElement('div');
        const statPercent = document.createElement('div');
        const statBufferInner = document.createElement('div');

        statItem.classList.add('stat-item');
        statLabel.classList.add('stat-label');
        statBufferOuter.classList.add('stat-buffer-outer');
        statPercent.classList.add('stat-percent');
        statBufferInner.classList.add('stat-buffer-inner');

        statItem.appendChild(statLabel);
        statItem.appendChild(statBufferOuter);
        statBufferOuter.appendChild(statPercent);
        statBufferOuter.appendChild(statBufferInner);
        
        const percent = route.percentCompCombined * 100;

        statBufferInner.style.width = Math.floor(percent) + '%';

        if (percent > 50 && percent < 80) {
            statBufferInner.classList.add('yellow-bg');
        } else if (percent < 50) {
            statBufferInner.classList.add('red-bg');
        }

        statLabel.textContent = route.fullName.toLowerCase();
        statPercent.textContent = percent.toFixed(1) + '%';

        return statItem;
    }

    function addRouteToRouteContainer(routeElem, routeIndex) {
        container.appendChild(routeElem);
    }

    return {
        reset: () => {
            routesAddedToDOM = [];
        },
        load: (data) => {
            for(let i = 0; i < data.length; i++) {

                const semiParsedData = data[i].split(',');
                const boroughShortName = semiParsedData[0];
                const borough = boroughList.getBorough( boroughShortName );
                const newRoute = new RouteInfo( semiParsedData );

                if (!boroughShortName || semiParsedData.length <= 7) {
                    continue;
                }
                
                if (borough) {
                    borough.addRoute( newRoute ); 
                } else {
                    const newBorough = new BoroughInfo( boroughShortName );
                    newBorough.addRoute( newRoute );
                    boroughList.addBorough( newBorough );

                }
            }
        },
        addToDOM: () => {
            for(let borough of boroughList.boroughs) {
                const boroughElem = document.createElement('div');
                const boroughHeadingElem = document.createElement('h2');
                boroughHeadingElem.textContent = borough.fullName;

                boroughElem.appendChild( boroughHeadingElem );

                for(let i = 0; i < borough.routes.length; i++) {
                    if (routesAddedToDOM.indexOf( borough.routes[i].shortName ) === -1) {
                        const routeElem =  routeElemCreator( borough.routes[i] );
                        boroughElem.appendChild(routeElem);
                        routesAddedToDOM.push( borough.routes[i].shortName );
                    }
                }

                addRouteToRouteContainer( boroughElem );
            }
        }
    }
})();

const KeyStart = () => {

    const uploadBtn = document.querySelector('.upload-file-btn');
    const modalBg = document.querySelector('.modal-bg');
    uploadBtn.addEventListener('click', function () { fileInput.click() }, false);

    const fileInput = document.getElementById('fileInput');
    fileInput.addEventListener('change', fileLoaderFunc, false);
    function fileLoaderFunc() {
        if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
            return;
        }
        const file = fileInput.files[0];
        fileReader.readAsText( file );
    }

    let data = [];

    const fileReader = new FileReader();
    fileReader.onload = dataParserFunc;
    function dataParserFunc() {
        data = fileReader.result.split('\n');
        data.shift();

        Engine.reset();
        Engine.load(data);
        Engine.addToDOM();

        uploadBtn.classList.add('display-none');
        modalBg.classList.add('display-none');
    }
};

KeyStart();
