
import { GraphicListController } from "../graphicList/graphicListController.js"
import { NodeLayerController } from "../nodeLayer/nodeLayerController.js"

var NodeLayer
var GraphicList

onInit(function(){

    NodeLayer = new NodeLayerController()
    GraphicList = new GraphicListController()

})

export class NodeSelectionController {

    nodeSelectionHTML = document.getElementById("nodeSelection")

    addTriggers(){

        let nodes = this.nodeSelectionHTML.children

        for (let index = 0; index < nodes.length; index++) {

            let node = nodes[index]

            node.addEventListener("click", () => {

                NodeLayer.add(node.textContent)
                GraphicList.add(node.textContent)

            })

        }

    }

}


