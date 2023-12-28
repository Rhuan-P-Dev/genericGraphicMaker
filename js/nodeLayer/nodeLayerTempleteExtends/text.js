import { InheritController } from "../../generalUtils/inherit.js"
import { NodeLayerXY } from "./XY.js"

export class NodeLayerText {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                NodeLayerXY
            ],
            build
        )

        this.instructions.push({
            "type": "text",
            "keyUpdate": "text",
            "placeholder": "Text"
        })

        this.instructions.push({
            "type": "number",
            "step": 1,
            "keyUpdate": "fontSize",
            "placeholder": "Font Size"
        })

        this.graphicListData.text = "hello world"
        this.graphicListData.fontSize = 10
        
    }

}