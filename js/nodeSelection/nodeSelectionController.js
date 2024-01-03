
import { GraphicListController } from "../graphicList/graphicListController.js"
import { NodeLayerController } from "../nodeLayer/nodeLayerController.js"

var NodeLayer
var GraphicList

onInit(function(){

    NodeLayer = new NodeLayerController()
    GraphicList = new GraphicListController()

})

const showHiddenObserver = new Observer()

var nodeSelectionWidth = undefined

export class NodeSelectionController {

    nodeSelectionHTML = document.getElementById("nodeSelection")

    constructor(){

        this.getShowHiddenObserver().add({
            "func": "setNodeSelectionState",
            "class": this
        })

        if(!nodeSelectionWidth){
            nodeSelectionWidth = this.nodeSelectionHTML.offsetWidth
        }
        
    }

    add(html){

        this.nodeSelectionHTML.appendChild(html)

    }

    getShowHiddenObserver(){
        return showHiddenObserver
    }

    setNodeSelectionState(state){

        this.nodeSelectionHTML.setAttribute("state", state)

    }

    getNodeSelectionState(){

        return this.nodeSelectionHTML.getAttribute("state")

    }

    close(){

        this.nodeSelectionHTML.style.display = "none"

        this.nodeSelectionHTML.style.width = "0px"

        this.getShowHiddenObserver().run("close")

    }

    open(){

        this.nodeSelectionHTML.style.display = "block"

        this.nodeSelectionHTML.style.width = nodeSelectionWidth + "px"

        this.getShowHiddenObserver().run("open")

    }

    switch(){

        if(
            this.getNodeSelectionState() == "close"
        ){
            this.open()
        }else{
            this.close()
        }

    }

    addTriggers(){

        let nodes = this.nodeSelectionHTML.children

        for (let index = 0; index < nodes.length; index++) {

            let node = nodes[index]

            node.addEventListener("click", () => {

                let ID = GraphicList.add(node.textContent)
                NodeLayer.add(node.textContent, ID)

            })

        }

    }

}


