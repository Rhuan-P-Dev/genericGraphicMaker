import { NodeLayerXY } from "./XY.js"

export class NodeLayerRadius extends NodeLayerXY {

    constructor(){

        super()

        this.instructions.push({
            "type": "number",
            "step": 1,
            "keyUpdate": "radius",
            "placeholder": "Radius"
        })

        this.graphicListData.radius = 10

    }

}