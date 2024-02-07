import { ScreenRenderController } from "../graphics/screenRenderController.js"
import { onInit } from "../misc/miscFunctions.js"
import { NodeConfigController } from "../nodeConfig/nodeConfigController.js"
import { nodeLayerTemplateInfoController } from "./nodeLayerTemplateInfoController.js"

var nodeLayerTemplateInfo
var NodeConfig
var ScreenRender

onInit(function(){

    nodeLayerTemplateInfo = new nodeLayerTemplateInfoController()
    NodeConfig = new NodeConfigController()
    ScreenRender = new ScreenRenderController()

})

export class NodeLayerController {

    nodeLayerHTML = document.getElementById("nodeLayer")
    nodeConfigHTML = document.getElementById("nodeConfig")

    add(templateName, ID){

        let newHtmlElement = document.createElement("div")

        newHtmlElement.setAttribute("class", "clickable interactiveDefault")
        newHtmlElement.innerHTML = templateName

        nodeLayerTemplateInfo.add(templateName, ID)

        newHtmlElement.setAttribute("id", ID)

        newHtmlElement.addEventListener("click", () => {

            NodeConfig.hidenAll()
            this.deselectAll()

            NodeConfig.show(ID)

            this.select(ID)

            ScreenRender.resetCanvasCallback()

        })

        this.nodeLayerHTML.appendChild(newHtmlElement)

    }

    delete(listID){

        let nodes = this.nodeLayerHTML.children

        for (let index = 0; index < nodes.length; index++) {

            let node = nodes[index]

            if(node.id == listID){

                node.remove()

                return node.id

            }
            
        }

    }

    select(ID){

        document.getElementById(ID).classList.add("selected")

    }

    deselectAll(){

        let elements = this.nodeLayerHTML.getElementsByClassName("selected")

        for (let index = 0; index < elements.length; index++) {

            elements[index].classList.remove("selected")
            
        }
    
    }

}