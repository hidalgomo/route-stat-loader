import { Renderer } from "./renderer";

class BoroughRenderer extends Renderer {

    getContainer = () => document.getElementById('boroughContainer');

    renderBoroughs = (boroughs) =>
        this.render(this.getContainer, boroughs, borough => borough.template());
}

export const boroughRenderer = new BoroughRenderer();