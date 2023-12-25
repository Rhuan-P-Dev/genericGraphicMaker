import { CloneObjectController } from "../generalUtils/cloneObject.js"
import { NodeLayerArc } from "../nodeLayer/nodeLayerTempleteExtends/arc.js"
import { NodeLayerContinuous } from "../nodeLayer/nodeLayerTempleteExtends/continuous.js"
import { NodeLayerRadius } from "../nodeLayer/nodeLayerTempleteExtends/radius.js"
import { NodeLayerText } from "../nodeLayer/nodeLayerTempleteExtends/text.js"

var CloneObject

onInit(function(){

    CloneObject = new CloneObjectController()

})

const GraphicList = new graphicList()
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

        let object = this.GraphicListInitTable[templateName]
        object.functionName = templateName

        GraphicList.add(

            CloneObject.recursiveCloneAttribute(
                object
            )
            
        )

        GraphicListObserver.run()

    }

    update(
        ID,
        key,
        value
    ){

        GraphicList.update(
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

        GraphicList.push(
            ID,
            key,
            value
        )

        GraphicListObserver.run()

    }

    return(){

        return GraphicList.return()

    }

    getDownload(){

        let nodes = new CloneObjectController().recursiveCloneAttribute(GraphicList.return())

        return GraphicList.getDownload(nodes)
    }
    

}