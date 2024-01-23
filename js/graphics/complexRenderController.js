import { onInit } from "../misc/miscFunctions.js"
import { CloneObjectController } from "../generalUtils/cloneObject.js"
import { ScreenRenderController } from "./screenRenderController.js"

var Clone = ""
var ScreenRender = ""

onInit(function(){

    Clone = new CloneObjectController()
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

    renderComplexFormat(drawInstructions){

        let object = undefined

        if(false){
            this.configObjectRender(object)
        }

        while(drawInstructions.value){

            let functionName = drawInstructions.value.functionName
            let originalParams = drawInstructions.value.params
            let params = Clone.recursiveCloneAttribute(originalParams)

            //this.debug(params)

            ScreenRender[functionName](params)

            drawInstructions = drawInstructions.next

        }

    }

}