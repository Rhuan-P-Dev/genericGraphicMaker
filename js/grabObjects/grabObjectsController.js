
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
            "x": e.offsetX,
            "y": e.offsetY
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
            this.movableObject.x = e.offsetX
            this.movableObject.y = e.offsetY
        }else{
            this.movableObject[0] = e.offsetX
            this.movableObject[1] = e.offsetY
        }

        ScreenRender.update()

        ScreenRender.resetCanvasCallback()

    }

    searchObjects(originalParams, mouseParams, calcOriginalParams = originalParams) {

        let distance = new VectorController().getTriangleSize(originalParams, mouseParams)
                
        if(
            distance < 10
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