import { CloneObjectController } from "../generalUtils/cloneObject.js"
import { VectorController } from "../generalUtils/vector.js"
import { GraphicListController } from "../graphicList/graphicListController.js"
import { NodeLayerController } from "../nodeLayer/nodeLayerController.js"
import { ComplexRenderController } from "./complexRenderController.js"

var GameState = ""
var Vector = ""
var ComplexRender = ""
var GraphicList


onInit(function(){

    GraphicList = new GraphicListController()
    ComplexRender = new ComplexRenderController()

})

var callback = () => {}
var resetCallback = () => {}

const MainCanvasObserver = new Observer()

export class ScreenRenderController {

    mainCanvas = document.getElementById("mainCanvas")
    mainCanvasContext = mainCanvas.getContext("2d")

    defaultColor = "black"
    defaultLineWidth = 1

    getMainCanvasObserver(){
        return MainCanvasObserver
    }

    setCanvasCallback(f){
        callback = f
    }

    setResetCanvasCallback(f){
        resetCallback = f
    }

    resetCanvasCallback(){
        callback = resetCallback
    }

    update(){

        ScreenRender.clean()

        let objects = GraphicList.return()

        ComplexRender.renderComplexFormat(objects)

    }

    init(){

        return

        ScreenRender.mainCanvasContext.translate(
            ScreenRender.mainCanvas.width / 2,
            ScreenRender.mainCanvas.height / 2,
        )

    }

    addTriggers(){

        GraphicList.getGraphicListObserver().add({
            "func": "update",
            "class": this
        })

        this.mainCanvas.addEventListener("click", function(e){

            MainCanvasObserver.run(e)
            callback(e)

        })

    }

    rotateObject(object){

        ScreenRender.mainCanvasContext.translate(object.x, object.y)

        ScreenRender.mainCanvasContext.rotate(
            object.radian
        )

    }

    resetCanvas(){

        ScreenRender.mainCanvasContext.resetTransform()

    }

    renderTheFrontOfShip(object){

        //ugly
        if(!object.radian){return}

        ScreenRender.mainCanvasContext.beginPath()
        ScreenRender.mainCanvasContext.moveTo(0, 0)
        ScreenRender.mainCanvasContext.lineTo(
            0, (object.width + object.height) * 2
        )
        ScreenRender.mainCanvasContext.closePath()
        ScreenRender.mainCanvasContext.stroke()

        return

        ScreenRender.mainCanvasContext.beginPath()
        ScreenRender.mainCanvasContext.moveTo(0, 0)
        ScreenRender.mainCanvasContext.lineTo(
            0 + ( ( object.width/2 ) * object.cosine ) * 10
            ,
            0 + ( ( object.height/2 ) * object.sine ) * 10
        )
        ScreenRender.mainCanvasContext.closePath()
        ScreenRender.mainCanvasContext.stroke()


    }

    renderComplexFormat(object){

        ComplexRender.renderComplexFormat(object)

        ScreenRender.mainCanvasContext.fillStyle = object.color

        ScreenRender.mainCanvasContext.beginPath()
        ScreenRender.mainCanvasContext.moveTo(0 - object.width, 0 - object.height)
        ScreenRender.mainCanvasContext.lineTo(0 + object.width, 0 - object.height)
        ScreenRender.mainCanvasContext.lineTo(0 + object.width, 0 + object.height)
        ScreenRender.mainCanvasContext.lineTo(0 - object.width, 0 + object.height)
        ScreenRender.mainCanvasContext.fill()

    }

    drawCircle(params) {

        ScreenRender.setStyleParams(params)

        ScreenRender.mainCanvasContext.beginPath()
        ScreenRender.mainCanvasContext.arc(
            params.x,
            params.y,
            params.radius,
            0,
            Math.PI * 2)
        ScreenRender.mainCanvasContext.stroke()

    }

    drawLine(params){

        ScreenRender.setStyleParams(params)

        ScreenRender.mainCanvasContext.beginPath()

        ScreenRender.mainCanvasContext.moveTo(
            params.positions[0][0],
            params.positions[0][1]
        )

        for (let index = 1; index < params.positions.length; index++) {
    
            ScreenRender.mainCanvasContext.lineTo(
                params.positions[index][0],
                params.positions[index][1]
            )

        }

        ScreenRender.mainCanvasContext.stroke()
        ScreenRender.mainCanvasContext.closePath()

    }

    fillArea(params){

        ScreenRender.setStyleParams(params)

        ScreenRender.mainCanvasContext.beginPath()
        ScreenRender.mainCanvasContext.moveTo(
            params.positions[0][0],
            params.positions[0][1]
        )

        for (let index = 1; index < params.positions.length; index++) {
    
            ScreenRender.mainCanvasContext.lineTo(
                params.positions[index][0],
                params.positions[index][1]
            )

        }
    
        ScreenRender.mainCanvasContext.fill()

    }

    writeText(params){

        ScreenRender.setStyleParams(params)

        ScreenRender.mainCanvasContext.font = (params.fontSize || 50) + "px Arial"

        ScreenRender.mainCanvasContext.textAlign = params.align || "center"

        ScreenRender.mainCanvasContext.fillText(
            params.text,
            params.x,
            params.y
        )

    }

    drawArc(params) {

        ScreenRender.setStyleParams(params)

        ScreenRender.mainCanvasContext.beginPath()
        ScreenRender.mainCanvasContext.arc(
            params.x,
            params.y,
            params.radius,
            params.startAngle,
            params.endAngle
        )
        ScreenRender.mainCanvasContext.stroke()
    }

    setStyleParams(params){

        ScreenRender.mainCanvasContext.strokeStyle = params.color || ScreenRender.defaultColor
        ScreenRender.mainCanvasContext.lineWidth = params.lineWidth || ScreenRender.defaultLineWidth
        ScreenRender.mainCanvasContext.fillStyle = params.color || ScreenRender.defaultColor

    }

    defaultParams(){

        ScreenRender.mainCanvasContext.strokeStyle = ScreenRender.defaultColor
        ScreenRender.mainCanvasContext.fillStyle = ScreenRender.defaultColor
        ScreenRender.mainCanvasContext.lineWidth = ScreenRender.defaultLineWidth

    }

    clean(){
        ScreenRender.mainCanvasContext.clearRect(
            0,
            0,
            ScreenRender.mainCanvas.width,
            ScreenRender.mainCanvas.height
        )
    }

}

var ScreenRender = new ScreenRenderController()