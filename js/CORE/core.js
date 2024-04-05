import { onInit } from "../misc/miscFunctions.js"
import { MainCanvasController } from "../canvas/mainCanvas/mainCanvasController.js"
import { DownloadController } from "../download/downloadController.js"
import { GrabObjectsController } from "../grabObjects/grabObjectsController.js"
import { CustomDrawsController } from "../graphicList/customDraws/customDrawsController.js"
import { ScreenRenderController } from "../graphics/screenRenderController.js"
import { KeyboardController } from "../keyboard/keyboardController.js"
import { NodeConfigController } from "../nodeConfig/nodeConfigController.js"
import { NodeLayerController } from "../nodeLayer/nodeLayerController.js"
import { NodeSelectionController } from "../nodeSelection/nodeSelectionController.js"
import { AnimationFrameController } from "../graphicList/animationFrameController.js"

var NodeSelection
var ScreenRender
var Download
var GrabObjects
var NodeConfig
var NodeLayer
var MainCanvas
var Keyboard
var CustomDraws
var AnimationFrame

onInit(function(){

    NodeSelection = new NodeSelectionController()
    ScreenRender = new ScreenRenderController()
    Download = new DownloadController()
    GrabObjects = new GrabObjectsController()
    NodeConfig = new NodeConfigController()
    NodeLayer = new NodeLayerController()
    MainCanvas = new MainCanvasController()
    Keyboard = new KeyboardController()
    CustomDraws = new CustomDrawsController()
    AnimationFrame = new AnimationFrameController()

    setTimeout(browseInit,1)

})

function browseInit(){

    NodeLayer.init()
    AnimationFrame.init()

    MainCanvas.init()

    CustomDraws.addCustomDraws()
    NodeSelection.addTriggers()

    ScreenRender.addTriggers()

    GrabObjects.init()

    Download.addTriggers()

    addDeleteButtonTrigger()

    Keyboard.addTriggers()

}

function addDeleteButtonTrigger(){

    document.getElementById("delete").addEventListener("click", () => {

        let listID = NodeConfig.delete()
        let deleteListID = NodeLayer.delete(listID)
        AnimationFrame.getCurrentFrame().remove(deleteListID)
        ScreenRender.resetCanvasCallback()

    })

}