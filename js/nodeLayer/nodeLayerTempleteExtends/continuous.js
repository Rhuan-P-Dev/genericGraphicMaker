import { onInit } from "../../misc/miscFunctions.js"
import { InheritController } from "../../generalUtils/inherit.js"
import { VectorController } from "../../generalUtils/vector.js"
import { GraphicListController } from "../../graphicList/graphicListController.js"
import { ScreenRenderController } from "../../graphics/screenRenderController.js"
import { NodeLayerBase } from "./base.js"

var GraphicList
var ScreenRender
var Vector

onInit(function(){

    GraphicList = new GraphicListController()
    ScreenRender = new ScreenRenderController()
    Vector = new VectorController()

})

export class NodeLayerContinuous {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                NodeLayerBase
            ],
            build
        )

        this.instructions.push({
            "type":"button",
            "text": "add point: ",
            "callback": (params) => {

                if(params.on){

                    ScreenRender.resetCanvasCallback()

                    params.on = false

                }else{

                    ScreenRender.setCanvasCallback(
                        (e) => {

                            let object = ScreenRender.adjustObject(
                                e.offsetX,
                                e.offsetY
                            )

                            object.x = ScreenRender.aligner(object.x)
                            object.y = ScreenRender.aligner(object.y)

                            let start = getLastPosition(params.listID)

                            let result = undefined

                            if(
                                !e["shiftKey"]
                                &&
                                start !== false
                            ){

                                result = new Near().generate(
                                    start,
                                    object,
                                )

                            }

                            if(
                                !e["shiftKey"]
                                &&
                                result
                                &&
                                result[0]
                                &&
                                !isNaN(result[0][0])
                            ){

                                GraphicList.massPush(
                                    params.listID,
                                    "positions",
                                    result,
                                )

                            }

                            GraphicList.push(
                                params.listID,
                                "positions",
                                [
                                    object.x,
                                    object.y,
                                ]
                            )
    
                        }
                    )
                    
                    params.on = true

                }

            }
        })

        this.graphicListData.positions = []

    }

}

function getLast(array){

    return array[array.length - 1]

}

function getLastPosition(ID){

    let positions = GraphicList.get(ID).value.params.positions

    let pos = getLast(positions)

    if(pos){

        return {
            "x": pos[0],
            "y": pos[1]
        } 

    }else{

        return false

    }

}


class BasicNear {

    getMinDistance(array) {

    	let nearestObject = array[0]

        for (let index = 1; index < array.length; index++) {

            if (Math.abs(array[index].distance) < Math.abs(nearestObject.distance)) {

                nearestObject = array[index]

            }

        }

        return nearestObject

    }

    updateDirections(directions, last){

        directions.left.x = last.x - ScreenRender.getAlignerNumber()
        directions.left.y = last.y
    
        directions.right.x = last.x + ScreenRender.getAlignerNumber()
        directions.right.y = last.y
    
        directions.top.x = last.x
        directions.top.y = last.y - ScreenRender.getAlignerNumber()
    
        directions.bottom.x = last.x
        directions.bottom.y = last.y + ScreenRender.getAlignerNumber()
    
    }

    getDirections(last, directions = {}){

        directions.left = {
            "name": "left"
        }

        directions.right = {
            "name": "right"
        }

        directions.top = {
            "name": "top"
        }

        directions.bottom = {
            "name": "bottom"
        }

        this.updateDirections(directions, last)

        return directions

    }

    getDistances(directions, end){

        directions.left.distance = Vector.getTriangleSize(
            directions.left,
            end
        )

        directions.right.distance = Vector.getTriangleSize(
            directions.right,
            end
        )

        directions.top.distance = Vector.getTriangleSize(
            directions.top,
            end
        )

        directions.bottom.distance = Vector.getTriangleSize(
            directions.bottom,
            end
        )

    }

    generateNode(directions, result, last ){

        let minObject = this.getMinDistance(
            [
                directions.left,
                directions.right,
                directions.top,
                directions.bottom
            ]
        )

        if(minObject.name == last.name) {

            let lastResult = getLast(result)

            lastResult[0] = minObject.x
            lastResult[1] = minObject.y

        }else{

            result.push([
                minObject.x,
                minObject.y,
            ])

        }

        return minObject

    }
   
}

class NearLow extends BasicNear{

    generate(
        start,
        end,
    ){

        let result = []

        let last = {
            "x": start.x,
            "y": start.y
        }

        let directions = this.getDirections(last)
        this.getDistances(directions, end)

        while(
            last.x != end.x
            &&
            last.y != end.y
        ){

            this.updateDirections(directions, last)

            last = this.generateNode(directions, result, last)

        }

        result.push([
            last.x,
            last.y
        ])

        return result

    }

}

class Near extends BasicNear {

    generate(
        start,
        end,
    ){

        let result = []

        let last = {
            "x": ScreenRender.aligner(start.x),
            "y": ScreenRender.aligner(start.y)
        }

        result.push([
            last.x,
            last.y
        ])

        while(
            last.x != end.x
            &&
            last.y != end.y
        ){

            let directions = this.getDirections(last)
            this.getDistances(directions, end)

            last = this.generateNode(directions, result, last)

        }

        return result

    }

}