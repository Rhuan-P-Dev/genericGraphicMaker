import { onInit } from "../../misc/miscFunctions.js"
import { NodeSelectionController } from "../../nodeSelection/nodeSelectionController.js"

var NodeSelection

onInit(function(){

    NodeSelection = new NodeSelectionController()

})

export class CustomDrawsController {

    draws = {

        "test": [{"params":{"scale":true,"objectColor":false,"color":"#ffffff","lineWidth":1,"positions":[[-7,-7.1],[7.3,-7],[7.3,7.7],[-7,7.6],[-7.4,-7.4],[-7,-7.125]]},"functionName":"drawLine"}]

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