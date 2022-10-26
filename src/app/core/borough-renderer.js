import { Renderer } from "./renderer";

class BoroughRenderer extends Renderer {

    getContainer = () => document.getElementById('boroughContainer');

    async renderBoroughsAsync(boroughs) {
        await this.renderAsync(this.getContainer, boroughs, borough => borough.template());
    }
}

export const boroughRenderer = new BoroughRenderer();