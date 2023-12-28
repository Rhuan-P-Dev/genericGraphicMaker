import { GraphicListController } from "../graphicList/graphicListController.js"
import { ComplexRenderController } from "./complexRenderController.js"

var ComplexRender
var GraphicList


onInit(function(){

    GraphicList = new GraphicListController()
    ComplexRender = new ComplexRenderController()

})

var callback = () => {}
var resetCallback = () => {}

const MainCanvasObserver = new Observer()

var zoom = 4

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

    drawCentralLine(){

        ScreenRender.drawLine({
            "positions": [
                [
                    ScreenRender.mainCanvas.width / 2,
                    0
                ],
                [
                    ScreenRender.mainCanvas.width / 2,
                    ScreenRender.mainCanvas.height
                ]
            ]
        })

        ScreenRender.drawLine({
            "positions": [
                [
                    0,
                    ScreenRender.mainCanvas.height / 2
                ],
                [
                    ScreenRender.mainCanvas.width,
                    ScreenRender.mainCanvas.height / 2
                ]
            ]
        })

    }
    minZoom = 1 - 0.25
    maxZoom = 16 + 0.25

    changerZoom(value){

        if(
            zoom + value > this.minZoom
            &&
            zoom + value < this.maxZoom
        ){
            zoom += value
        }

    }

    getZoom(){
        return zoom
    }

    update(){

        ScreenRender.clean()
        ScreenRender.resetCanvas()

        ScreenRender.drawCentralLine()

        ScreenRender.mainCanvasContext.scale(
            this.getZoom(),
            this.getZoom()
        )

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

    resetCanvas(){

        ScreenRender.mainCanvasContext.resetTransform()

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

        if(!params.positions[0]){return}

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

        if(!params.positions[0]){return}

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

    resetCanvas(){

        ScreenRender.mainCanvasContext.resetTransform()

    }

}

var ScreenRender = new ScreenRenderController()