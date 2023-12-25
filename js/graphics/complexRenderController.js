import { CloneObjectController } from "../generalUtils/cloneObject.js"
import { ScreenRenderController } from "./screenRenderController.js"

var Clone = ""
var ScreenRender = ""

onInit(function(){

    Clone = new CloneObjectController()
    ScreenRender = new ScreenRenderController()

})

export class ComplexRenderController {

    getObjectScale(object){

        return 1 //(object.width + object.height) / 10

    }

    scalonateParam = {
        "drawLine": (
            object,
            functionName,
            originalParams,
            params,
        ) => {

            for(let index in params.positions){

                let pos = params.positions[index]

                let scale = this.getObjectScale(object)

                pos[0] *= scale
                pos[1] *= scale

            }

        },

        "fillArea": (
            object,
            functionName,
            originalParams,
            params,
        ) => {

            this.scalonateParam["drawLine"](object, functionName, originalParams, params)

        },

        "drawCircle": (
            object,
            functionName,
            originalParams,
            params,
        ) => {

            let scale = this.getObjectScale(object)

            params.x *= scale
            params.y *= scale

            params.radius *= scale


        },

        "drawArc": (
            object,
            functionName,
            originalParams,
            params,
        ) => {

            this.scalonateParam["drawCircle"](object, functionName, originalParams, params)

        },

        "writeText": (
            object,
            functionName,
            originalParams,
            params,
        ) => {

            let scale = this.getObjectScale(object)

            params.x *= scale
            params.y *= scale
            params.fontSize *= scale

        },

    }

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

    runtimeConfigObjectRender(
        object,
        functionName,
        originalParams,
        params,
    ){

        if(params.scale){

            this.scalonateParam[functionName](
                object,
                functionName,
                originalParams,
                params,
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
            let params = Clone.recursiveCloneAttribute(originalParams)

            this.runtimeConfigObjectRender(
                object,
                functionName,
                originalParams,
                params
            )

            ScreenRender[functionName](params)

            drawInstructions = drawInstructions.next

        }

    }

}