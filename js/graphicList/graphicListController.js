import { CloneObjectController } from "../generalUtils/cloneObject.js"
import { ScreenRenderController } from "../graphics/screenRenderController.js"
import { NodeLayerArc } from "../nodeLayer/nodeLayerTempleteExtends/arc.js"
import { NodeLayerContinuous } from "../nodeLayer/nodeLayerTempleteExtends/continuous.js"
import { NodeLayerRadius } from "../nodeLayer/nodeLayerTempleteExtends/radius.js"
import { NodeLayerText } from "../nodeLayer/nodeLayerTempleteExtends/text.js"

var CloneObject
var ScreenRender

onInit(function(){

    CloneObject = new CloneObjectController()
    ScreenRender = new ScreenRenderController()

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

            this.scaleNode("import", object)
            this.centralizerNode("import", object)

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

    return(){

        return GraphicListConst.return()

    }

    getDownload(){

        let nodes = CloneObject.recursiveCloneAttribute(GraphicListConst.return())

        let node = nodes

        while(node.next){

            this.centralizerNode("export", node)
            this.scaleNode("export", node)

            node = node.next
            
        }

        return GraphicListConst.getDownload(nodes)

    }
    
    centralizerNode(mode, node){

        if(node.value.params.positions){

            for (let index = 0; index < node.value.params.positions.length; index++) {
                
                let pos = node.value.params.positions[index]

                if(mode == "export"){
                    pos[0] -= ScreenRender.mainCanvas.width / 2
                    pos[1] -= ScreenRender.mainCanvas.height / 2
                }else{
                    pos[0] += ScreenRender.mainCanvas.width / 2
                    pos[1] += ScreenRender.mainCanvas.height / 2
                }
                
            }

        }else{

            if(mode == "export"){
                node.value.params.x -= ScreenRender.mainCanvas.width / 2
                node.value.params.y -= ScreenRender.mainCanvas.height / 2
            }else{
                node.value.params.x += ScreenRender.mainCanvas.width / 2
                node.value.params.y += ScreenRender.mainCanvas.height / 2
            }

        }

    }

    scaleNode(mode, node){

        if(node.value.params.positions){

            for (let index = 0; index < node.value.params.positions.length; index++) {
                
                let pos = node.value.params.positions[index]

                if(mode == "export"){
                    pos[0] /= ScreenRender.getZoom()
                    pos[1] /= ScreenRender.getZoom()
                }else{
                    pos[0] *= ScreenRender.getZoom()
                    pos[1] *= ScreenRender.getZoom()
                }
                
                
            }

        }else{

            if(mode == "export"){
                node.value.params.x /= ScreenRender.getZoom()
                node.value.params.y /= ScreenRender.getZoom()
            }else{
                node.value.params.x *= ScreenRender.getZoom()
                node.value.params.y *= ScreenRender.getZoom()
            }

        }

    }

}