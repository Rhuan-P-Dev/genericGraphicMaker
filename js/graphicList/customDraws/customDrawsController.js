import { NodeSelectionController } from "../../nodeSelection/nodeSelectionController.js"

var NodeSelection

onInit(function(){

    NodeSelection = new NodeSelectionController()

})

export class CustomDrawsController {

    draws = {

        "bandeira": [
            {
                "params": {
                    "scale":true,"objectColor":false,"color":"black","lineWidth":1,"positions":[[-4.846153846153846,-0.23076923076923078],[-14.153846153846153,-13.846153846153847],[0,-19.846153846153847],[-8.153846153846153,-5.3076923076923075]]},
                    "functionName":"drawLine"
            },{
                "params": {
                    "scale":true,"objectColor":true,"color":"black","lineWidth":1,"positions":[[-8.307692307692308,-5.3076923076923075],[-14.153846153846153,-13.846153846153847],[-0.23076923076923078,-19.615384615384617]]},
                    "functionName":"fillArea"
            }
        ],

        "test":[{"params":{"scale":true,"objectColor":false,"color":"#ffea00","lineWidth":"7","positions":[[-56,-17.5],[30.5,-34.75],[104.25,-10],[62.5,49.5],[-72.75,47.25],[-117.5,16.25],[-73.75,-33.25],[11,-38.25],[45.25,-23.75],[128.75,-5.25]]},"functionName":"drawLine"},{"params":{"scale":true,"objectColor":false,"color":"#ff0000","lineWidth":"5","x":-1.5,"y":-1,"radius":"19"},"functionName":"drawCircle"},{"params":{"scale":true,"objectColor":true,"color":"black","lineWidth":1,"x":5,"y":-54.25,"text":"hello world","fontSize":10},"functionName":"writeText"},{"params":{"scale":true,"objectColor":false,"color":"black","lineWidth":"10","x":-1.75,"y":12,"radius":"17","startAngle":0,"endAngle":2.792526803190927},"functionName":"drawArc"},{"params":{"scale":true,"objectColor":false,"color":"#3a2222","lineWidth":1,"positions":[[-78.75,-46.75],[-50.75,-60.25],[-46.5,-47.75],[-41.75,-65.25],[-32.5,-53.25],[-26.5,-68.5],[-13.5,-64.75],[3,-70],[13.25,-65],[30,-69.25],[29.5,-72.5],[30.25,-72.5],[28.75,-73.5],[39,-51.5],[35.75,-73.75],[19,-77],[-75.25,-67.25]]},"functionName":"fillArea"}],
        
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