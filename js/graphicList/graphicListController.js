import { onInit } from "../misc/miscFunctions.js"
import { CloneObjectController } from "../generalUtils/cloneObject.js"
import { ScreenRenderController } from "../graphics/screenRenderController.js"
import { NodeLayerArc } from "../nodeLayer/nodeLayerTempleteExtends/arc.js"
import { NodeLayerContinuous } from "../nodeLayer/nodeLayerTempleteExtends/continuous.js"
import { NodeLayerRadius } from "../nodeLayer/nodeLayerTempleteExtends/radius.js"
import { NodeLayerText } from "../nodeLayer/nodeLayerTempleteExtends/text.js"
import { CustomDrawsController } from "./customDraws/customDrawsController.js"
import { GraphicList, Observer } from "../misc/miscClass.js"

var CloneObject
var ScreenRender
var CustomDraws

onInit(function(){

    CloneObject = new CloneObjectController()
    ScreenRender = new ScreenRenderController()
    CustomDraws = new CustomDrawsController()

})

const GraphicListConst = new GraphicList()
const GraphicListObserver = new Observer()

export class GraphicListController {

    getGraphicListObserver() {
        return GraphicListObserver
    }

    GraphicListInitTable = {
        "writeText": {

            "params": new NodeLayerText(true).graphicListData

        },

        "drawCircle": {

            "params": new NodeLayerRadius(true).graphicListData

        },

        "drawArc": {

            "params": new NodeLayerArc(true).graphicListData

        },

        "drawLine": {

            "params": new NodeLayerContinuous(true).graphicListData

        },

        "fillArea": {

            "params": new NodeLayerContinuous(true).graphicListData

        },

    }

    add(templateName){

        let object = this.GraphicListInitTable[templateName] || CustomDraws.get(templateName)

        let ID = undefined

        if(!object.length){
            
            ID = this.addSingle(
                templateName,
                object
            )

        }else{

            ID = this.addMultiple(object)

        }

        GraphicListObserver.run()

        return ID

    }

    addSingle(
        templateName,
        object
    ){

        object.functionName = templateName

        let ID = GraphicListConst.add(

            CloneObject.recursiveCloneAttribute(
                object
            )

        )

        return ID

    }

    addMultiple(objects){

        let IDs = []

        for (let index = 0; index < objects.length; index++) {

            let object = CloneObject.recursiveCloneAttribute(objects[index])

            let ID = GraphicListConst.add({
                "functionName": object.functionName,
                "params": object.params
            })

            IDs.push(ID)
            
        }

        return IDs

    }

    remove(ID){

        let arrayID = ID.split(",")

        for(let index = 0; index < arrayID.length; index++){

            GraphicListConst.remove(
                arrayID[index]
            )

        }

        GraphicListObserver.run()

    }

    get(ID){

        return GraphicListConst.get(ID)

    }

    update(
        ID,
        key,
        value
    ){

        GraphicListConst.update(
            ID,
            key,
            value
        )

        GraphicListObserver.run()

    }

    push(
        ID,
        key,
        value
     ){

        GraphicListConst.push(
            ID,
            key,
            value
        )

        GraphicListObserver.run()

    }

    pop(
        ID,
        key,
    ){

        GraphicListConst.pop(
            ID,
            key,
        )

        GraphicListObserver.run()

    }

    massPush(
        ID,
        key,
        value
     ){

        for (let index = 0; index < value.length; index++) {

            GraphicListConst.push(
                ID,
                key,
                value[index]
            )
            
        }

        GraphicListObserver.run()

    }


    return(){

        return GraphicListConst.return()

    }

    getDownload(){

        let nodes = CloneObject.recursiveCloneAttribute(GraphicListConst.return())

        nodes = GraphicListConst.getDownload(nodes)

        nodes = new naiveOptimization(nodes)

        return nodes

    }
    
}

// loss information
class naiveOptimization{

    constructor(nodes){

        for (let index = 0; index < nodes.length; index++) {

            let node = nodes[index]

            if(Array.isArray(node.params.positions)){
                node.params.positions = this.optimize(node)
            }

        }

        return nodes

    }

    optimize(node){

        let positions = node.params.positions

        //console.log(positions)

        let reducedPositions = this.reduce(positions)

        //console.log(reducedPositions)

        console.log("--------------- [ "+ reducedPositions.length / positions.length + " | " + positions.length / reducedPositions.length + " ] ---------------")

        return reducedPositions

    }

    reduce(positions){

        let reducedPositions = []

        for (let index = 0; index < positions.length; index++) {

            let position = positions[index]

            let add = true

            for (let indey = 0; indey < reducedPositions.length; indey++) {

                let reducedPosition = reducedPositions[indey]

                if(
                    position[0] === reducedPosition[0]
                    &&
                    position[1] === reducedPosition[1]
                ){

                    add = false
                    break

                }


            }

            if(add){
                reducedPositions.push(position)
            }
            
        }

        return reducedPositions

    }

}