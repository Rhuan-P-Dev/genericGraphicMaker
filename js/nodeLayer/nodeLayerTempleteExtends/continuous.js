import { InheritController } from "../../generalUtils/inherit.js"
import { GraphicListController } from "../../graphicList/graphicListController.js"
import { ScreenRenderController } from "../../graphics/screenRenderController.js"
import { NodeLayerBase } from "./base.js"

var GraphicList
var ScreenRender

onInit(function(){

    GraphicList = new GraphicListController()
    ScreenRender = new ScreenRenderController()

})

export class NodeLayerContinuous {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                NodeLayerBase
            ],
            build
        )

        this.instructions.push({
            "type":"button",
            "text": "add point: ",
            "callback": (params) => {

                if(params.on){

                    ScreenRender.resetCanvasCallback()

                    params.on = false

                }else{

                    ScreenRender.setCanvasCallback(
                        (e) => {

                            let object = ScreenRender.adjustObject(
                                e.offsetX,
                                e.offsetY
                            )

                            GraphicList.push(
                                params.listID,
                                "positions",
                                [
                                    object.x,
                                    object.y,
                                ]
                            )
    
                        }
                    )
                    
                    params.on = true

                }

            }
        })

        this.graphicListData.positions = []

    }

}