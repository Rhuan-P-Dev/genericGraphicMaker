import { onInit } from "../misc/miscFunctions.js"
import { MainCanvasController } from "../canvas/mainCanvas/mainCanvasController.js"
import { Observer } from "../misc/miscClass.js"

var MainCanvas

onInit(function(){

    MainCanvas = new MainCanvasController()

})

const showHiddenObserver = new Observer()

var nodeConfigWidth = undefined

export class NodeConfigController {

    nodeConfigHTML = document.getElementById("nodeConfig")

    constructor(){

        this.getShowHiddenObserver().add({
            "func": "setNodeConfigState",
            "class": this
        })

        if(!nodeConfigWidth){
            nodeConfigWidth = this.nodeConfigHTML.offsetWidth
        }

    }

    getShowHiddenObserver(){
        return showHiddenObserver
    }

    hidenAll(){

        let nodes = this.nodeConfigHTML.children

        for (let index = 0; index < nodes.length; index++) {

            nodes[index].style.display = "none"
            
        }

    }

    show(listID){

        let nodes = this.nodeConfigHTML.children

        for (let index = 0; index < nodes.length; index++) {

            let node = nodes[index]

            if(node.getAttribute("list_id") == listID){

                node.style.display = "block"

                MainCanvas.resize()

                return

            }

        }

    }
    
    getOpenNode(){

        let nodes = this.nodeConfigHTML.children

        for (let index = 0; index < nodes.length; index++) {

            let node = nodes[index]

            if(node.style.display != "none"){

                return node

            }
            
        }

    }

    delete(){

        let node = this.getOpenNode()

        let listID = node.getAttribute("list_id")

        node.remove()

        return listID

    }

    setNodeConfigState(state){

        this.nodeConfigHTML.setAttribute("state", state)

    }

    getNodeConfigState(){

        return this.nodeConfigHTML.getAttribute("state")

    }

    close(){

        this.nodeConfigHTML.style.display = "none"

        this.nodeConfigHTML.style.width = "0px"

        this.getShowHiddenObserver().run("close")

    }

    open(){

        this.nodeConfigHTML.style.display = "block"

        this.nodeConfigHTML.style.width = nodeConfigWidth + "px"

        this.getShowHiddenObserver().run("open")

    }

    switch(){

        if(
            this.getNodeConfigState() == "close"
        ){
            this.open()
        }else{
            this.close()
        }

    }

}