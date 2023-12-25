import { DownloadController } from "../download/downloadController.js"
import { GrabObjectsController } from "../grabObjects/grabObjectsController.js"
import { ScreenRenderController } from "../graphics/screenRenderController.js"
import { NodeSelectionController } from "../nodeSelection/nodeSelectionController.js"

var NodeSelection
var ScreenRender
var Download
var GrabObjects

onInit(function(){

    NodeSelection = new NodeSelectionController()
    ScreenRender = new ScreenRenderController()
    Download = new DownloadController()
    GrabObjects = new GrabObjectsController()

    setTimeout(browseInit,1)

})

function browseInit(){

    NodeSelection.addTriggers()

    ScreenRender.addTriggers()
    ScreenRender.init()

    GrabObjects.init()

    Download.addTriggers()

}