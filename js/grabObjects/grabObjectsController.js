
import { VectorController } from "../generalUtils/vector.js"
import { GraphicListController } from "../graphicList/graphicListController.js"
import { ScreenRenderController } from "../graphics/screenRenderController.js"


var ScreenRender
var GraphicList

onInit(function(){

    ScreenRender = new ScreenRenderController()
    GraphicList = new GraphicListController()

})

export class GrabObjectsController {

    init(){

        ScreenRender.setResetCanvasCallback(
            this.searchCallbackFunction
        )

        ScreenRender.setCanvasCallback(
            this.searchCallbackFunction
        )

    }

    searchCallbackFunction = (e) => {

        let mouseParams = {
            "x": ScreenRender.centralize(e.offsetX, "width"),
            "y": ScreenRender.centralize(e.offsetY, "height")
        }

        let drawInstructions = GraphicList.return()

        let stop = false

        while(
            !stop
            &&
            drawInstructions.value
        ){

            let originalParams = drawInstructions.value.params

            if(originalParams.positions){
                stop = this.searchPoints(originalParams, mouseParams)
            }else{
                stop = this.searchObjects(originalParams, mouseParams)
            }

            drawInstructions = drawInstructions.next

        }
    }

    movableObject = undefined

    moveObjectCallback = (e) => {

        if(this.movableObject.x){
            this.movableObject.x = ScreenRender.centralize(e.offsetX, "width")
            this.movableObject.y = ScreenRender.centralize(e.offsetY, "height")
        }else{
            this.movableObject[0] = ScreenRender.centralize(e.offsetX, "width")
            this.movableObject[1] = ScreenRender.centralize(e.offsetY, "height")
        }

        ScreenRender.update()

        ScreenRender.resetCanvasCallback()

    }

    searchObjects(originalParams, mouseParams, calcOriginalParams = originalParams) {

        let distance = new VectorController().getTriangleSize(originalParams, mouseParams)
                
        if(
            distance < 10 / ScreenRender.getZoom()
        ){

            ScreenRender.setCanvasCallback(this.moveObjectCallback)

            this.movableObject = calcOriginalParams

            return true

        }else{
            return false
        }

    }

    searchPoints(originalParams, mouseParams) {

        for (let index = 0; index < originalParams.positions.length; index++) {
            
            let point = originalParams.positions[index]

            let pointXY = {
                "x": point[0],
                "y": point[1]
            }

            if(this.searchObjects(pointXY, mouseParams, point)){return true}
            
        }

        return false

    }

}