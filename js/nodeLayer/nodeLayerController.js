import { NodeConfigController } from "../nodeConfig/nodeConfigController.js"
import { nodeLayerTemplateInfoController } from "./nodeLayerTemplateInfoController.js"

var nodeLayerTemplateInfo = ""

onInit(function(){

    nodeLayerTemplateInfo = new nodeLayerTemplateInfoController()

})

export class NodeLayerController {

    nodeLayerHTML = document.getElementById("nodeLayer")
    nodeConfigHTML = document.getElementById("nodeConfig")

    add(templateName, ID){

        let newHtmlElement = document.createElement("div")

        newHtmlElement.setAttribute("class", "clickable")
        newHtmlElement.innerHTML = templateName

        newHtmlElement.setAttribute("list_id", ID)

        newHtmlElement.addEventListener("click", () => {

            new NodeConfigController().hidenAll()

            new NodeConfigController().show(ID)

        })

        this.nodeLayerHTML.appendChild(newHtmlElement)

        nodeLayerTemplateInfo.add(templateName, ID)

    }

    delete(listID){

        let nodes = this.nodeLayerHTML.children

        for (let index = 0; index < nodes.length; index++) {

            let node = nodes[index]

            if(node.getAttribute("list_id") == listID){

                node.remove()

                return

            }
            
        }

    }

}