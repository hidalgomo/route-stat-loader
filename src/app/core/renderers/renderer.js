export class Renderer {

    constructor() {
        if (this.constructor === Renderer) {
            throw new Error('Renderer class cannot be instantiated.');
        }
    }

    async renderAsync(getContainerCallback, dataSet, templateCallback) {
        return await new Promise((resolve, reject) => {
            for(let obj of dataSet) {
                getContainerCallback(obj).appendChild( templateCallback( obj ) )
            }

            setTimeout(resolve, 100);
        });
    }
}