import { boroughMapping } from "./mappings";

export function Borough(obj) {
    Object.assign(this, obj);
    this.fullName = boroughMapping[this.borough] && boroughMapping[this.borough].name;
    this.Route = [];

    this.template = () => {

        let routeHtml = '';
        for (let route of this.Route) {
            routeHtml += route.template();
        }

        return `
            <div class="borough">
                <div class="borough-label">
                    <div>${ this.fullName }</div>
                </div>
                <div class="route-container">${ routeHtml }</div>
            </div>`;
    }
}