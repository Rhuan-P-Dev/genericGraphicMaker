import { AnimationFrameController } from "../graphicList/animationFrameController.js"
import { ScreenRenderController } from "../graphics/screenRenderController.js"
import { onInit } from "../misc/miscFunctions.js"
import { NodeConfigController } from "../nodeConfig/nodeConfigController.js"
import { nodeLayerTemplateInfoController } from "./nodeLayerTemplateInfoController.js"

var nodeLayerTemplateInfo
var NodeConfig
var ScreenRender
var AnimationFrame

onInit(function(){

    nodeLayerTemplateInfo = new nodeLayerTemplateInfoController()
    NodeConfig = new NodeConfigController()
    ScreenRender = new ScreenRenderController()
    AnimationFrame = new AnimationFrameController()

})

export class NodeLayerController {

    nodeLayerHTML = document.getElementById("nodeLayer")
    nodeConfigHTML = document.getElementById("nodeConfig")

    init(){

        this.addFrame()

    }

    add(templateName, ID){

        let newHtmlElement = document.createElement("div")

        newHtmlElement.setAttribute("class", `clickable interactiveDefault frame${this.getFrameCount()}`)
        newHtmlElement.innerHTML = templateName

        nodeLayerTemplateInfo.add(templateName, ID)

        newHtmlElement.setAttribute("id", ID)

        newHtmlElement.addEventListener("click", () => {

            NodeConfig.hidenAll()
            this.deselectAll()

            NodeConfig.show(ID)

            this.select(ID)

            ScreenRender.resetCanvasCallback()

        })

        this.nodeLayerHTML.appendChild(newHtmlElement)

    }

    delete(listID){

        let nodes = this.nodeLayerHTML.children

        for (let index = 0; index < nodes.length; index++) {

            let node = nodes[index]

            if(node.id == listID){

                node.remove()

                return node.id

            }
            
        }

    }

    select(ID){

        document.getElementById(ID).classList.add("selected")

    }

    deselectAll(){

        let elements = this.nodeLayerHTML.getElementsByClassName("selected")

        for (let index = 0; index < elements.length; index++) {

            elements[index].classList.remove("selected")
            
        }
    
    }

    getFrameCount() {
        return this.nodeLayerHTML.getElementsByClassName("frame").length
    }

    addFrame() {
        let frameCount = this.getFrameCount() + 1
        let templateName = `Frame ${frameCount}`

        let newHtmlElement = document.createElement("div")
        newHtmlElement.setAttribute("class", "clickable interactiveDefault frame")
        newHtmlElement.innerHTML = templateName
        newHtmlElement.setAttribute("id", `frame${frameCount}`)

        newHtmlElement.addEventListener("click", () => {

            this.hidenAll()
            NodeConfig.hidenAll()

            newHtmlElement.style.display = ""

            AnimationFrame.setCurrentFrame(frameCount - 1)

            this.showFrameChildren(newHtmlElement)

            ScreenRender.update()

        })

        AnimationFrame.createFrame()

        this.nodeLayerHTML.appendChild(newHtmlElement)

    }

    reset(){

        this.hidenAll()
        this.modifyFramesStyle("display", "")

    }

    modifyFramesStyle(name, value){

        let frames = this.nodeLayerHTML.getElementsByClassName("frame")

        for (let index = 0; index < frames.length; index++) {

          frames[index].style[name] = value

        }

    }

    getAddElementsFromCurrentFrame(){

        return this.nodeLayerHTML.getElementsByClassName(`frame${this.getFrameCount()}`)

    }

    hidenAll(){

        let nodes = this.nodeLayerHTML.children

        for (let index = 0; index < nodes.length; index++) {

            nodes[index].style.display = "none"
            
        }

    }

    showFrameChildren(frame){

        let nodes = this.nodeLayerHTML.getElementsByClassName(frame.id)

        for (let index = 0; index < nodes.length; index++) {

            nodes[index].style.display = ""

        }
    
    }

}