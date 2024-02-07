import { onInit } from "../misc/miscFunctions.js"
import { CloneObjectController } from "../generalUtils/cloneObject.js"
import { NodeLayerArc } from "../nodeLayer/nodeLayerTempleteExtends/arc.js"
import { NodeLayerContinuous } from "../nodeLayer/nodeLayerTempleteExtends/continuous.js"
import { NodeLayerRadius } from "../nodeLayer/nodeLayerTempleteExtends/radius.js"
import { NodeLayerText } from "../nodeLayer/nodeLayerTempleteExtends/text.js"
import { CustomDrawsController } from "./customDraws/customDrawsController.js"
import { GraphicList, Observer, referenceNode } from "../misc/miscClass.js"

var CloneObject
var CustomDraws

onInit(function(){

    CloneObject = new CloneObjectController()
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

    getDraw(templateName){

        return this.GraphicListInitTable[templateName]

    }

    add(templateName){

        let object = this.getDraw(templateName) || CustomDraws.get(templateName)

        let ID = this.addSingle(
            templateName,
            object
        )

        GraphicListObserver.run()

        return ID

    }

    addSingle(
        templateName,
        object
    ){

        let addObject = undefined

        if(
            !this.getDraw(templateName)
        ){

            addObject = new referenceNode(templateName)

        }else{

            addObject = CloneObject.recursiveCloneAttribute(
                object
            )

            addObject.functionName = templateName

        }
    
        let ID = GraphicListConst.add(addObject)

        return ID

    }

    remove(ID){

        GraphicListConst.remove(
            ID
        )

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


    return(transform = false){

        if(transform){

            return this.transform()

        }else{

            return GraphicListConst.return()

        }

    }

    transform(){

        let tempGraphicList = new GraphicList()

        let nodes = CloneObject.recursiveCloneAttribute(GraphicListConst.return())

        while(nodes.next){

            let drawInstructions = []

            if(typeof(nodes.value.params.reference) === "string"){

                drawInstructions = CustomDraws.get(nodes.value.params.reference, false, nodes.value.params)

            }else{

                drawInstructions = [nodes.value]

            }

            for (let index = 0; index < drawInstructions.length; index++) {

                let drawInstruction = drawInstructions[index]

                tempGraphicList.add(drawInstruction)
                
            }

            nodes = nodes.next

        }

        return tempGraphicList.return()

    }

    getDownload(){

        let nodes = CloneObject.recursiveCloneAttribute(GraphicListConst.return())

        nodes = GraphicListConst.getDownload(nodes)

        let originalNodes = CloneObject.recursiveCloneAttribute(nodes)

        let optimizedNodes = new naiveOptimization(nodes)

        return [originalNodes, optimizedNodes]

    }
    
}

// loss information
class naiveOptimization{

    constructor(nodes){

        for (let index = 0; index < nodes.length; index++) {

            let node = nodes[index]

            if(
                node.params
                &&
                Array.isArray(node.params.positions)
            ){
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