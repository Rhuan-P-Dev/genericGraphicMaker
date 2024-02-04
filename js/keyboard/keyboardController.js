import { GraphicListController } from "../graphicList/graphicListController.js"
import { onInit } from "../misc/miscFunctions.js"
import { NodeConfigController } from "../nodeConfig/nodeConfigController.js"
import { NodeSelectionController } from "../nodeSelection/nodeSelectionController.js"

var NodeSelection
var NodeConfig
var GraphicList

onInit(function(){

    NodeSelection = new NodeSelectionController()
    NodeConfig = new NodeConfigController()
    GraphicList = new GraphicListController()

})

const keyboardFunctions = {
    "Escape": () => {
        NodeConfig.close()
        NodeSelection.close()
    },
}

const keyBoardShiftFunctions = {
    "\"": () => {
        NodeConfig.switch()
    },
    "!": () => {
        NodeSelection.switch()
    },
}

const keyBoardCtrlKeyFunctions = {
    "z": () => {
        let listID = NodeConfig.getNodeID(
            NodeConfig.getOpenNode()
        )

        GraphicList.pop(
            listID,
            "positions",
        )
    },
}

export class KeyboardController{

    addTriggers(){

        document.querySelector("html").addEventListener("keydown",(e) => {

            if(keyboardFunctions[e["key"]] && !e["shiftKey"]){
                keyboardFunctions[e["key"]]()
            }

            if(keyBoardShiftFunctions[e["key"]] && e["shiftKey"]){
                keyBoardShiftFunctions[e["key"]]()
            }

            if(keyBoardCtrlKeyFunctions[e["key"]] && e["ctrlKey"]){
                keyBoardCtrlKeyFunctions[e["key"]]()
            }

        })
    
    }

}