import { NodeConfigController } from "../nodeConfig/nodeConfigController.js"
import { NodeSelectionController } from "../nodeSelection/nodeSelectionController.js"

var NodeSelection
var NodeConfig

onInit(function(){

    NodeSelection = new NodeSelectionController()
    NodeConfig = new NodeConfigController()

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

export class KeyboardController{

    addTriggers(){

        document.querySelector("html").addEventListener("keydown",function(e){

            if(keyboardFunctions[e["key"]] && !e["shiftKey"]){
                keyboardFunctions[e["key"]]()
            }

            if(keyBoardShiftFunctions[e["key"]] && e["shiftKey"]){
                keyBoardShiftFunctions[e["key"]]()
            }

        })
    
    }

}