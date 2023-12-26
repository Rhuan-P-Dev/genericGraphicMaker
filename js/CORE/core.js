import { DownloadController } from "../download/downloadController.js"
import { GrabObjectsController } from "../grabObjects/grabObjectsController.js"
import { GraphicListController } from "../graphicList/graphicListController.js"
import { ScreenRenderController } from "../graphics/screenRenderController.js"
import { NodeConfigController } from "../nodeConfig/nodeConfigController.js"
import { NodeLayerController } from "../nodeLayer/nodeLayerController.js"
import { NodeSelectionController } from "../nodeSelection/nodeSelectionController.js"

var NodeSelection
var ScreenRender
var Download
var GrabObjects
var NodeConfig
var NodeLayer
var GraphicList

onInit(function(){

    NodeSelection = new NodeSelectionController()
    ScreenRender = new ScreenRenderController()
    Download = new DownloadController()
    GrabObjects = new GrabObjectsController()
    NodeConfig = new NodeConfigController()
    NodeLayer = new NodeLayerController()
    GraphicList = new GraphicListController()

    setTimeout(browseInit,1)

})

function browseInit(){

    NodeSelection.addTriggers()

    ScreenRender.addTriggers()
    ScreenRender.init()

    GrabObjects.init()

    Download.addTriggers()

    addDeleteButtonTrigger()

}

function addDeleteButtonTrigger(){

    document.getElementById("delete").addEventListener("click", () => {

        let listID = NodeConfig.delete()
        NodeLayer.delete(listID)
        GraphicList.remove(listID)
        ScreenRender.resetCanvasCallback()

    })

}