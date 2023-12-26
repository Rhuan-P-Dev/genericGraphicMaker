import { CloneObjectController } from "../generalUtils/cloneObject.js"
import { NodeLayerArc } from "../nodeLayer/nodeLayerTempleteExtends/arc.js"
import { NodeLayerContinuous } from "../nodeLayer/nodeLayerTempleteExtends/continuous.js"
import { NodeLayerRadius } from "../nodeLayer/nodeLayerTempleteExtends/radius.js"
import { NodeLayerText } from "../nodeLayer/nodeLayerTempleteExtends/text.js"

var CloneObject

onInit(function(){

    CloneObject = new CloneObjectController()

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

        let object = this.GraphicListInitTable[templateName]
        object.functionName = templateName

        let ID = GraphicListConst.add(

            CloneObject.recursiveCloneAttribute(
                object
            )
            
        )

        GraphicListObserver.run()

        return ID

    }

    remove(ID){

        GraphicListConst.remove(ID)

        GraphicListObserver.run()

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

    return(){

        return GraphicListConst.return()

    }

    getDownload(){

        let nodes = CloneObject.recursiveCloneAttribute(GraphicListConst.return())

        return GraphicListConst.getDownload(nodes)
    }
    

}