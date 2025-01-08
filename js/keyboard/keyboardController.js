import { CloneObjectController } from "../generalUtils/cloneObject.js"
import { AnimationFrameController } from "../graphicList/animationFrameController.js"
import { ScreenRenderController } from "../graphics/screenRenderController.js"
import { onInit } from "../misc/miscFunctions.js"
import { NodeConfigController } from "../nodeConfig/nodeConfigController.js"
import { NodeLayerController } from "../nodeLayer/nodeLayerController.js"
import { NodeSelectionController } from "../nodeSelection/nodeSelectionController.js"

var NodeSelection
var NodeConfig
var ScreenRender
var CloneObject
var NodeLayer
var AnimationFrame

onInit(function(){

    NodeSelection = new NodeSelectionController()
    NodeConfig = new NodeConfigController()
    ScreenRender = new ScreenRenderController()
    CloneObject = new CloneObjectController()
    NodeLayer = new NodeLayerController()
    AnimationFrame = new AnimationFrameController()

})

function copyLayerNode(ID, X = 1){

    // -1 control v
    // -2 animation

    AnimationFrame.setCurrentFrame(NodeLayer.getFrameCount()-X)

    let originalNode = CloneObject.recursiveCloneAttribute(
        AnimationFrame.getCurrentFrame().get(ID).value,
        new (AnimationFrame.getCurrentFrame().get(ID).value).constructor,
        true
    )

    AnimationFrame.setCurrentFrame(NodeLayer.getFrameCount()-1)

    let copyID = AnimationFrame.getCurrentFrame().add(originalNode.functionName || originalNode.params.reference)

    let copyNode = AnimationFrame.getCurrentFrame().get(copyID).value

    for (let key in originalNode.params) {

        copyNode.params[key] = originalNode.params[key]

    }

    NodeLayer.add(
        originalNode.functionName || originalNode.params.reference,
        copyID
    )

    ScreenRender.update()

}

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
    "O": () => {

        let addElements = NodeLayer.getAddElementsFromCurrentFrame()

        NodeLayer.addFrame()

        for (let index = 0; index < addElements.length; index++) {

            let addElement = addElements[index]

            copyLayerNode(addElement.id,2)

        }

        NodeLayer.reset()

        ScreenRender.resetCanvasCallback()

    },
    "I": () => {
        NodeLayer.reset()
        ScreenRender.resetCanvasCallback()
    }
    
}

const keyBoardCtrlKeyFunctions = {
    "z": () => {
        let listID = NodeConfig.getNodeID(
            NodeConfig.getOpenNode()
        )

        AnimationFrame.getCurrentFrame().pop(
            listID,
            "positions",
        )
    },
    "v": () => {

        copyLayerNode(
            NodeConfig.getNodeID(
                NodeConfig.getOpenNode()
            ),
            1
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