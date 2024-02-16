import { VectorController } from "../../generalUtils/vector.js"
import { NodeLayerRadius } from "./radius.js"

export class NodeLayerArc extends NodeLayerRadius {

    constructor(){

        super()

        this.instructions.push({
            "type": "number",
            "step": (3.14 / 360).toFixed(2),
            "keyUpdate": "startAngle",
            "placeholder": "Start Angle",
            "title": "Start Angle"
        })

        this.instructions.push({
            "type": "number",
            "step": (3.14 / 360).toFixed(2),
            "keyUpdate": "endAngle",
            "placeholder": "End Angle",
            "title": "End Angle"
        })

        this.graphicListData.startAngle = 0
        this.graphicListData.endAngle = new VectorController().toRadians(160)

    }

}