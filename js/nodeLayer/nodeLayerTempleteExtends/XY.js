import { onInit } from "../../misc/miscFunctions.js"
import { ScreenRenderController } from "../../graphics/screenRenderController.js"
import { NodeLayerBase } from "./base.js"
import { AnimationFrameController } from "../../graphicList/animationFrameController.js"

var ScreenRender
var AnimationFrame

onInit(function(){

    ScreenRender = new ScreenRenderController()
    AnimationFrame = new AnimationFrameController()

})

export class NodeLayerXY extends NodeLayerBase {

    constructor(){

        super()

        this.instructions.push({
            "type":"button",
            "text": "set X/Y: ",
            "callback": (params) => {

                ScreenRender.setCanvasCallback(
                    (e) => {

                        let object = ScreenRender.adjustObject(
                            e.offsetX,
                            e.offsetY
                        )
                        
                        object.x = ScreenRender.aligner(object.x)
                        object.y = ScreenRender.aligner(object.y)

                        AnimationFrame.getCurrentFrame().update(
                            params.listID,
                            "x",
                            object.x
                        )

                        AnimationFrame.getCurrentFrame().update(
                            params.listID,
                            "y",
                            object.y
                        )

                        ScreenRender.resetCanvasCallback()

                    }
                )

            }
        })

        this.graphicListData.x = 50
        this.graphicListData.y = 50

    }

}