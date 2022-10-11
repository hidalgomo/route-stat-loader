import { boroughMapping } from "./mappings.js";

export function Borough(boroughShortName) {
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
}