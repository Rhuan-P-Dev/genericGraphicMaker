import { onInit } from "../misc/miscFunctions.js"
import { CloneObjectController } from "../generalUtils/cloneObject.js"
import { ScreenRenderController } from "../graphics/screenRenderController.js"
import { NodeLayerArc } from "./nodeLayerTempleteExtends/arc.js"
import { NodeLayerContinuous } from "./nodeLayerTempleteExtends/continuous.js"
import { NodeLayerRadius } from "./nodeLayerTempleteExtends/radius.js"
import { NodeLayerText } from "./nodeLayerTempleteExtends/text.js"
import { AnimationFrameController } from "../graphicList/animationFrameController.js"

var CloneObject
var AnimationFrame
var ScreenRender

onInit(function(){

    CloneObject = new CloneObjectController()
    AnimationFrame = new AnimationFrameController()
    ScreenRender = new ScreenRenderController()

})

export class nodeLayerTemplateInfoController {

    genericTemplate = [
        {
            "type":"number",
            "step": (Math.PI / 180).toFixed(2),
            "keyUpdate": "rotation",
            "placeholder": "Rotation",
            "title":"Rotation"
        },{
            "type":"number",
            "step": 1/100,
            "keyUpdate": "canvasScale",
            "placeholder": "Scale",
            "title":"Scale"
        },{
            "type":"button",
            "text": "set offset: ",
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
                            "offset",
                            {
                                "x": object.x,
                                "y": object.y
                            }
                        )

                        ScreenRender.resetCanvasCallback()

                    }
                )

            }
        }
    ]

    htmlTypes = {
        "boolean": (params) => {

            let div = document.createElement("div")

            div.innerText = params.text

            let checkbox = document.createElement("input")
            checkbox.type = "checkbox"

            checkbox.checked = params.default

            checkbox.setAttribute("class", "clickable")

            checkbox.addEventListener("change", (e) => {

                AnimationFrame.getCurrentFrame().update(
                    params.listID,
                    params.keyUpdate,
                    e.target.checked
                )

            })

            div.appendChild(checkbox)

            return div

        },
        "button": (params) => {

            let button = document.createElement("button")

            button.setAttribute("class", "clickable")

            button.innerText = params.text

            button.addEventListener("click", () => {

                params.callback(
                    params
                )

            })

            return button

        },
        "text": (params) => {

            let textArea = document.createElement("textarea")

            textArea.title = params.title || ""

            textArea.value = params.default

            textArea.placeholder = params.placeholder

            textArea.addEventListener("keyup", (e) => {

                AnimationFrame.getCurrentFrame().update(
                    params.listID,
                    params.keyUpdate,
                    e.target.value
                )

            })

            return textArea

        },
        "number": (params) => {

            let input = document.createElement("input")

            input.type = "number"

            input.title = params.title || ""

            input.value = params.default

            input.step = params.step

            input.placeholder = params.placeholder

            input.addEventListener("keyup", (e) => {

                AnimationFrame.getCurrentFrame().update(
                    params.listID,
                    params.keyUpdate,
                    parseFloat(e.target.value)
                )

            })

            return input

        },
        "color": function(params) {

            let input = document.createElement("input")

            input.type = "color"

            input.title = params.title || ""

            input.value = params.default

            input.addEventListener("change", (e) => {

                AnimationFrame.getCurrentFrame().update(
                    params.listID,
                    params.keyUpdate,
                    e.target.value
                )

            })

            return input

        }

    }

    createTitle(
        name,
        html
    ){

        let div = document.createElement("div")

        div.style.backgroundColor = "black"

        div.innerHTML = name

        html.appendChild(div)

    }

    buildHtml(
        div = document.createElement("div"),
        text,
        listID,
    ){

        div.setAttribute("id", listID)

        div.style.display = "none"

        let params = AnimationFrame.getCurrentFrame().get(listID).value.params

        for (let index in text) {
            
            let node = text[index]

            node.listID = listID

            node.default = params[node.keyUpdate]

            div.appendChild(
                this.htmlTypes[node.type](
                    node
                )
            )

        }

        return div

    }

    add(functionName, listID) {

        let html = document.getElementById("nodeConfig")

        let div = document.createElement("div")

        this.createTitle(
            functionName,
            div
        )

        if(this.templates[functionName]){

            this.buildHtml(
                div,
                CloneObject.recursiveCloneAttribute(this.templates[functionName]),
                listID
            )
    
        }

        this.buildHtml(
            div,
            CloneObject.recursiveCloneAttribute(this.genericTemplate),
            listID
        )

        html.appendChild(
            div
        )

    }

    templates = {

        "writeText": new NodeLayerText().instructions,

        "drawCircle": new NodeLayerRadius().instructions,

        "drawArc": new NodeLayerArc().instructions,

        "drawLine": new NodeLayerContinuous().instructions,

        "fillArea": new NodeLayerContinuous().instructions,

    }

}