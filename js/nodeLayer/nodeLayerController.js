import { onInit } from "../misc/miscFunctions.js"
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

        newHtmlElement.setAttribute("class", "clickable interativeDefault")
        newHtmlElement.innerHTML = templateName

        nodeLayerTemplateInfo.add(templateName, ID)

        newHtmlElement.setAttribute("delete_list_id", ID)

        if(typeof(ID) == "object"){
            ID = ID[ID.length-1]
        }

        newHtmlElement.setAttribute("list_id", ID)

        newHtmlElement.addEventListener("click", () => {

            new NodeConfigController().hidenAll()

            new NodeConfigController().show(ID)

        })

        this.nodeLayerHTML.appendChild(newHtmlElement)

    }

    delete(listID){

        let nodes = this.nodeLayerHTML.children

        for (let index = 0; index < nodes.length; index++) {

            let node = nodes[index]

            if(node.getAttribute("list_id") == listID){

                node.remove()

                return node.getAttribute("delete_list_id")

            }
            
        }

    }

}