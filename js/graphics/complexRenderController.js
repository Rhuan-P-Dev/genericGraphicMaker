import { onInit } from "../misc/miscFunctions.js"
import { CloneObjectController } from "../generalUtils/cloneObject.js"
import { ScreenRenderController } from "./screenRenderController.js"

var CloneObject = ""
var ScreenRender = ""

onInit(function(){

    CloneObject = new CloneObjectController()
    ScreenRender = new ScreenRenderController()

})

export class ComplexRenderController {

    configObjectRender(object){

        let drawInstructions = object.graphicRender.map.return()

        while(drawInstructions.value){

            let originalParams = drawInstructions.value.params

            if(originalParams.objectColor){

                originalParams.color = object.color

            }

            drawInstructions = drawInstructions.next

        }

        object.graphicRender.configurate = false

    }

    debug(params){

        if(params.x !== undefined){

            ScreenRender["drawCircle"](
                {
                    "x": params.x,
                    "y": params.y,
                    "radius": 10 / ScreenRender.getZoom(),
                    "lineWidth": params.lineWidth
                }
            )

        }else{


            for (let index = 0; index < params.positions.length; index++) {

                let pos = params.positions[index]

                ScreenRender["drawCircle"](
                    {
                        "x": pos[0],
                        "y": pos[1],
                        "radius": 10 / ScreenRender.getZoom(),
                        "lineWidth": params.lineWidth
                    }
                )
                
            }

        }

    }

    mirrorFunction(functionName, params, scaleX, scaleY){

        ScreenRender.setCanvasState(
            params.offset,
            params.rotation,
            scaleX,
            scaleY,
        )

        ScreenRender[functionName](params)

        ScreenRender.reset()

    }

    mirror(functionName, params){

        ScreenRender.reset()

        if(params.xMirror){
            this.mirrorFunction(
                functionName,
                params,
                params.canvasScale * -1,
                params.canvasScale
            )
        }

        if(params.yMirror){
            this.mirrorFunction(
                functionName,
                params,
                params.canvasScale,
                params.canvasScale * -1
            )
        }

        if(params.xyMirror){
            this.mirrorFunction(
                functionName,
                params,
                params.canvasScale * -1,
                params.canvasScale * -1
            )
        }

    }

    renderComplexFormat(drawInstructions){

        let object = undefined

        if(false){
            this.configObjectRender(object)
        }

        while(drawInstructions.value){

            let functionName = drawInstructions.value.functionName
            let originalParams = drawInstructions.value.params
            let params = CloneObject.recursiveCloneAttribute(originalParams)

            if(params.canvasScale !== undefined){
                params.canvasScale += 1
                ScreenRender.applyConfig(params)
            }

            params.lineWidth /= ScreenRender.getZoom()

            ScreenRender[functionName](params)

            //this.debug(params)

            if(params.canvasScale !== undefined){
                this.mirror(functionName, params)
            }

            //ScreenRender.reset()

            drawInstructions = drawInstructions.next

        }

    }

}