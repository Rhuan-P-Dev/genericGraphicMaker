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
    "prisp": "shipsTab",
    "ship? - P4": "shipsTab",
    "stranger - P2": "shipsTab",
    "base cryprwtrazghu": "partsTab",
    "ghu": "dronesTab",
    "traz": "dronesTab",
    "prw": "dronesTab",
    "cry": "dronesTab",
    "trazghu": "dronesTab",
    "cryprw": "dronesTab",
    "cryprwtrazghu": "shipsTab",
    "bullet": "projectilesTab",
    "explosive bullet": "projectilesTab",
    "mine": "projectilesTab",
    "death hand": "projectilesTab",
    "mini world": "projectilesTab",
    "default": "partsTab",
    "generic turret head": "partsTab",
    "fenix base": "partsTab",
    "self swarm drone: v1": "dronesTab",
    "self swarm drone: v2": "dronesTab",
    "old self swarm drone": "shipsTab",
    "bounty hunter": "shipsTab",
    "purpleShip - 0": "shipsTab",
    "purpleShip - 1": "partsTab",
    "purpleShip - 2": "partsTab",
    "purpleShip - 3": "partsTab",
    "purpleShip - 4": "partsTab",
    "purpleShip - 5": "shipsTab",
    "mrAnonymous": "shipsTab",
    "lordIllusionist": "shipsTab",
    "lordIllusionist - final": "shipsTab",
    "soldier": "shipsTab",
    "holy general - p1": "partsTab",
    "stalker": "partsTab",
    "medal of divine honor": "partsTab",
    "holy general": "shipsTab",
    "lazy sentinel": "shipsTab",
    "lazy sentinel - upscale": "shipsTab",
    "drone sentinel - p1": "partsTab",
    "drone sentinel": "dronesTab",
    "drone sentinel - upscale": "dronesTab",
    "bone": "projectilesTab",
    "evolutron": "shipsTab",
    "evolutron - upscale": "shipsTab",
    "police": "shipsTab",
    "government drone": "dronesTab",
    "mrD": "shipsTab",
    "zombie": "shipsTab",
    "distributor": "dronesTab",
    "reaper - p1": "partsTab",
    "reaper": "shipsTab",
    "ink drop": "projectilesTab",
    "chess piece mold": "partsTab",
    "chess piece: pawn": "dronesTab",
    "chess piece: tower": "dronesTab",
    "chess piece: horse": "dronesTab",
    "chess piece: bishop": "dronesTab",
    "chess piece: king": "shipsTab",
    "chess piece: queen - p1": "partsTab",
    "chess piece: queen": "shipsTab",
    "stalker - draft": "partsTab",
    "stalker": "shipsTab",
    "pacifist": "shipsTab",
    "genocide": "shipsTab",
    "arena closer": "shipsTab",
    "hero - weak": "shipsTab",
    "hero - strong": "shipsTab",
    "freee": "dronesTab",
    "freeedis": "dronesTab",
    "slime": "dronesTab",
    "slime container": "dronesTab",
    "soul split": "dronesTab",
    "slimecss": "dronesTab",
    "freeedisslimecss": "shipsTab",
    "cryprwtrazghufreeedisslimecss": "shipsTab",
    "deceiver": "shipsTab",
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