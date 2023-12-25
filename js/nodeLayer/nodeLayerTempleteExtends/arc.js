import { VectorController } from "../../generalUtils/vector.js"
import { NodeLayerRadius } from "./radius.js"

export class NodeLayerArc extends NodeLayerRadius {

    constructor(){

        super()

        this.instructions.push({
            "type": "number",
            "keyUpdate": "startAngle",
            "placeholder": "StartAngle"
        })

        this.instructions.push({
            "type": "number",
            "keyUpdate": "endAngle",
            "placeholder": "EndAngle"
        })

        this.graphicListData.startAngle = 0
        this.graphicListData.endAngle = new VectorController().toRadians(160)

    }

}