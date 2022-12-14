import { routeMapping } from "./mappings";

// TODO:
// "No data" needs UI implementation

export class Route {

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

    constructor(obj) {
        Object.assign(this, obj);
        this.fullName = routeMapping[this.route_name];
        this.equipments = [];
    }

    template(labelPropName = 'fullName', percentPropName = 'pctcomp_combined', callback) {
        const routeContainer = document.createElement('div');
        routeContainer.classList.add('route');
        routeContainer.id = this.route_name;
        routeContainer.title = this[labelPropName];

        routeContainer.innerHTML = `
            <div class="route-label">${ this[labelPropName] }</div>  
            <a class="link route-map" href="http://10.155.228.80:4200/ruto-pub/percent-complete/${ this.mongo_id }?startTime=${ this.dateTimeStamp.start }&endTime=${ this.dateTimeStamp.end }&equipment=${ this.equipments.join(',') }" title="Route Map">Route Map</a>
            <a class="link truck-map" href="http://10.155.228.80:4200/ruto-pub/percent-complete/${ this.mongo_id }?startTime=${ this.dateTimeStamp.start }&endTime=${ this.dateTimeStamp.end }&equipment=${ this.equipment_id }" title="Truck Map">Truck Map</a>
            <div class="outer-progress-bar">
                <div class="inner-progress-bar ${ this.#evalClass(this[percentPropName]) }"></div>
                <div class="progress-percent">${ (this[percentPropName] * 100).toFixed(1) }%</div>
            </div>`;
        
        if (callback) routeContainer.addEventListener('click', function() { callback(this) });

        return routeContainer;
    }
}