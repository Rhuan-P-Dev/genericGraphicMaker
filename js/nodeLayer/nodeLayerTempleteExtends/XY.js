import { GraphicListController } from "../../graphicList/graphicListController.js"
import { ScreenRenderController } from "../../graphics/screenRenderController.js"
import { NodeLayerBase } from "./base.js"

var GraphicList
var ScreenRender

onInit(function(){

    GraphicList = new GraphicListController()
    ScreenRender = new ScreenRenderController()

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

                        GraphicList.update(
                            params.listID,
                            "x",
                            ScreenRender.centralize(e.offsetX, "width")
                        )

                        GraphicList.update(
                            params.listID,
                            "y",
                            ScreenRender.centralize(e.offsetY, "height")
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