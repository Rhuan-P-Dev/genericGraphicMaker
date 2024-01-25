import { onInit } from "../../misc/miscFunctions.js"
import { NodeSelectionController } from "../../nodeSelection/nodeSelectionController.js"

var NodeSelection

onInit(function(){

    NodeSelection = new NodeSelectionController()

})

export class CustomDrawsController {

    draws = {

    }

    addCustomDraws(){

        for(let draw in this.draws){

            let div = document.createElement("div")

            div.setAttribute("class", "clickable interativeDefault")

            div.innerHTML = draw

            NodeSelection.add(div)

        }

    }

    get(name) {
        return this.draws[name]
    }


}