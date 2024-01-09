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

    renderComplexFormat(drawInstructions){

        let object = undefined

        if(false){
            this.configObjectRender(object)
        }

        while(drawInstructions.value){

            let functionName = drawInstructions.value.functionName
            let originalParams = drawInstructions.value.params
            let params = Clone.recursiveCloneAttribute(originalParams)

            params.lineWidth /= ScreenRender.getZoom()

            ScreenRender[functionName](params)

            drawInstructions = drawInstructions.next

        }

    }

}