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

            object.value = {
                "functionName": object.functionName,
                "params": object.params
            }

            let ID = GraphicListConst.add(object)

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

        return GraphicListConst.getDownload(nodes)

    }
    
}