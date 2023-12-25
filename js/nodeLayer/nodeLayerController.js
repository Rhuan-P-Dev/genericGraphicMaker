import { NodeConfigController } from "../nodeConfig/nodeConfigController.js"
import { nodeLayerTemplateInfoController } from "./nodeLayerTemplateInfoController.js"

var nodeLayerTemplateInfo = ""

onInit(function(){

    nodeLayerTemplateInfo = new nodeLayerTemplateInfoController()

})

export class NodeLayerController {

    nodeLayerHTML = document.getElementById("nodeLayer")
    nodeConfigHTML = document.getElementById("nodeConfig")

    add(templateName){

        let newHtmlElement = document.createElement("div")

        newHtmlElement.setAttribute("class", "clickable")
        newHtmlElement.innerHTML = templateName

        let listID = this.nodeLayerHTML.children.length+1

        newHtmlElement.setAttribute("list_id", listID)

        newHtmlElement.addEventListener("click", () => {

            new NodeConfigController().hidenAll()

            new NodeConfigController().show(listID)

        })

        this.nodeLayerHTML.appendChild(newHtmlElement)

        nodeLayerTemplateInfo.add(templateName, listID)

    }

}