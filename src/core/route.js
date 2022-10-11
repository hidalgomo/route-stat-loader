import { routeMapping } from "./mappings";

export function Route(route) {
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
}