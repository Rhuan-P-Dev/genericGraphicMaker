import { CloneObjectController } from "../generalUtils/cloneObject.js"
import { GraphicListController } from "../graphicList/graphicListController.js"
import { ScreenRenderController } from "../graphics/screenRenderController.js"
import { onInit } from "../misc/miscFunctions.js"
import { NodeConfigController } from "../nodeConfig/nodeConfigController.js"
import { NodeLayerController } from "../nodeLayer/nodeLayerController.js"
import { NodeSelectionController } from "../nodeSelection/nodeSelectionController.js"

var NodeSelection
var NodeConfig
var GraphicList
var ScreenRender
var CloneObject
var NodeLayer

onInit(function(){

    NodeSelection = new NodeSelectionController()
    NodeConfig = new NodeConfigController()
    GraphicList = new GraphicListController()
    ScreenRender = new ScreenRenderController()
    CloneObject = new CloneObjectController()
    NodeLayer = new NodeLayerController()

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
    "v": () => {

        let originalID = NodeConfig.getNodeID(
            NodeConfig.getOpenNode()
        )

        let originalNode = CloneObject.recursiveCloneAttribute(
            GraphicList.get(originalID).value,
            new (GraphicList.get(originalID).value).constructor,
            true
        )

        let copyID = GraphicList.add(originalNode.functionName || originalNode.params.reference)

        let copyNode = GraphicList.get(copyID).value

        for (let key in originalNode.params) {

            copyNode.params[key] = originalNode.params[key]

        }

        NodeLayer.add(
            originalNode.functionName || originalNode.params.reference,
            copyID
        )

        ScreenRender.update()

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