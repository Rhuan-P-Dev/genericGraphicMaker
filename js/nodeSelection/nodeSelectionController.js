import { onInit } from "../misc/miscFunctions.js"
import { NodeLayerController } from "../nodeLayer/nodeLayerController.js"
import { Observer } from "../misc/miscClass.js"
import { AnimationFrameController } from "../graphicList/animationFrameController.js"

var NodeLayer
var AnimationFrame

onInit(function(){

    NodeLayer = new NodeLayerController()
    AnimationFrame = new AnimationFrameController()

})

const showHiddenObserver = new Observer()

var nodeSelectionWidth = undefined

const nameTypeTable = {
    "missile": "projectilesTab",
    "drone v1": "dronesTab",
    "drone v2": "dronesTab",
    "big drone": "dronesTab",
    "factory": "stationaryObjectsTab",
    "armored factory": "stationaryObjectsTab",
    "rotable stationary object": "partsTab",
    "sock base": "partsTab",
    "turret": "partsTab",
    "generic turret": "stationaryObjectsTab",
    "ship": "shipsTab",
    "bullet": "projectilesTab",
    "explosive bullet": "projectilesTab",
    "mine": "projectilesTab",
    "death hand": "projectilesTab",
    "mini world": "projectilesTab",
    "default": "partsTab",
    "generic turret head": "partsTab"
}

export class NodeSelectionController {

    nodeSelectionHTML = document.getElementById("nodeSelection")
    nodeSelectionTabsHTML = document.getElementById("nodeSelectionTabs")
    nodeSelectionClickTabsHTML = document.getElementById("nodeSelectionClickTabs")

    constructor(){

        this.getShowHiddenObserver().add({
            "func": "setNodeSelectionState",
            "class": this
        })

        if(!nodeSelectionWidth){
            nodeSelectionWidth = this.nodeSelectionHTML.offsetWidth
        }
        
    }

    addDrawInstructionInTab(name){

        let div = document.createElement("div")

        div.setAttribute("class", "clickable interactiveDefault")

        div.innerHTML = name

        document.getElementById(nameTypeTable[name]).appendChild(div)

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

        this.drawInstructionsTrigger()

        this.tabsInteractionTrigger()

        this.searchTrigger()

    }

    searchTrigger() {

        let input = document.getElementById("nodeSelectionSeach")

        let tabs = this.nodeSelectionTabsHTML.children
      
        input.addEventListener("input", () => {

            let filter = input.value.toLowerCase().split("|")

            for (let index = 0; index < tabs.length; index++) {

                let tab = tabs[index]

                let tabNodes = tab.children
      
                for (let indey = 0; indey < tabNodes.length; indey++) {

                    let node = tabNodes[indey]

                    for (let indez = 0; indez < filter.length; indez++) {

                        if(
                            node.innerText.toLowerCase().indexOf(filter[indez]) > -1
                        ){
    
                            node.style.display = ""

                            break
    
                        } else {
    
                            node.style.display = "none"
    
                        }
                        
                    }

                }

            }

        })

      }
      

    drawInstructionsTrigger(){

        let nodes = this.nodeSelectionTabsHTML.children

        for (let index = 0; index < nodes.length; index++) {

            let tabNodes = nodes[index].children

            for (let index = 0; index < tabNodes.length; index++) {

                let node = tabNodes[index]

                node.addEventListener("click", () => {

                    this.nodeSelectionClickFunction(node.textContent)
    
                })
                
            }

        }

    }

    tabsInteractionTrigger(){

        let nodes = this.nodeSelectionClickTabsHTML.children

        for (let index = 0; index < nodes.length; index++) {

            let node = nodes[index]

            node.addEventListener("click", () => {

                if(node.classList.contains("selected")){

                    this.showTabs()

                    this.deselectAllClickTabs()

                }else{

                    this.hiddenTabs()
                    this.deselectAllClickTabs()
                    this.showTab(node.getAttribute("type"))
                    this.selectClickTab(node.innerText)

                }

            })

        }

    }

    nodeSelectionClickFunction(name){

        let ID = AnimationFrame.getCurrentFrame().add(name)
        NodeLayer.add(name, ID)

        return ID

    }

    showTab(selectedTab){

        let tabs = this.nodeSelectionTabsHTML.children

        for (let index = 0; index < tabs.length; index++) {

            let tab = tabs[index]

            if (tab.id === selectedTab) {

                tab.style.display = "block"

                break

            }

        }
    }

    showTabs(){

        this.applyTabs("block")

    }

    hiddenTabs(){

        this.applyTabs("none")

    }

    applyTabs(display){

        let tabs = this.nodeSelectionTabsHTML.children

        for (let index = 0; index < tabs.length; index++) {

            tabs[index].style.display = display

        }

    }

    selectClickTab(name) {

        let tabs = this.nodeSelectionClickTabsHTML.children

        for (let index = 0; index < tabs.length; index++) {

            let tab = tabs[index]

            if (tab.innerText === name) {

                tab.classList.add("selected")

                break

            }

        }
    }
    
    deselectAllClickTabs() {

        let tabs = this.nodeSelectionClickTabsHTML.children

        for (let index = 0; index < tabs.length; index++) {

            tabs[index].classList.remove("selected")

        }

    }

}