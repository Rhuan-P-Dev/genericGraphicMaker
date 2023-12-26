import { CloneObjectController } from "../generalUtils/cloneObject.js"
import { ScreenRenderController } from "./screenRenderController.js"

var Clone = ""
var ScreenRender = ""

onInit(function(){

    Clone = new CloneObjectController()
    ScreenRender = new ScreenRenderController()

})

export class ComplexRenderController {

    scalonateContinuos(
        object,
        functionName,
        originalParams,
        params,
    ){

        for(let index in params.positions){

            let pos = params.positions[index]

            let scale = ScreenRender.getZoom()

            pos[0] /= scale
            pos[1] /= scale

        }

    }

    scalonateNormal(
        object,
        functionName,
        originalParams,
        params,
    ){

        let scale = ScreenRender.getZoom()

        params.x /= scale
        params.y /= scale

    }

    scalonateParam = {
        "drawLine": (
            object,
            functionName,
            originalParams,
            params,
        ) => {

            this.scalonateContinuos(
                object,
                functionName,
                originalParams,
                params,
            )

        },

        "fillArea": (
            object,
            functionName,
            originalParams,
            params,
        ) => {

            this.scalonateContinuos(
                object,
                functionName,
                originalParams,
                params,
            )

        },

        "drawCircle": (
            object,
            functionName,
            originalParams,
            params,
        ) => {

            this.scalonateNormal(
                object,
                functionName,
                originalParams,
                params,
            )

        },

        "drawArc": (
            object,
            functionName,
            originalParams,
            params,
        ) => {

            this.scalonateNormal(
                object,
                functionName,
                originalParams,
                params,
            )

        },

        "writeText": (
            object,
            functionName,
            originalParams,
            params,
        ) => {

            this.scalonateNormal(
                object,
                functionName,
                originalParams,
                params,
            )

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

        this.scalonateParam[functionName](
            object,
            functionName,
            originalParams,
            params,
        )

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