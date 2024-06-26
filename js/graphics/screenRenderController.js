import { onInit } from "../misc/miscFunctions.js"
import { MainCanvasController } from "../canvas/mainCanvas/mainCanvasController.js"
import { VectorController } from "../generalUtils/vector.js"
import { ComplexRenderController } from "./complexRenderController.js"
import { Observer } from "../misc/miscClass.js"
import { AnimationFrameController } from "../graphicList/animationFrameController.js"

var ComplexRender
var MainCanvas
var Vector
var AnimationFrame

var tableMainCanvasZero = {}

onInit(function(){

    ComplexRender = new ComplexRenderController()
    MainCanvas = new MainCanvasController()
    Vector = new VectorController()
    AnimationFrame = new AnimationFrameController()

    tableMainCanvasZero = {
        "width": MainCanvas.box.offsetWidth / 2,
        "height": MainCanvas.box.offsetHeight / 2,
    }

})

var callback = () => {}
var resetCallback = () => {}

const MainCanvasObserver = new Observer()

var zoom = 32
var radian = 0
var alignerNumber = 0.25

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

    centralize(number, string){

        number -= this.getMainCanvasZero(string)

        number /= this.getZoom()

        return number

    }

    adjustObject(x, y){

        let object = {
            "x": ScreenRender.centralize(x, "width"),
            "y": ScreenRender.centralize(y, "height")
        }

        Vector.rotate(
            object,
            ScreenRender.getRadian()
        )

        return object

    }

    //Math...
    roundToMultiple(number, multiple) {
        return (Math.round((number*100) / (multiple*100)) * (multiple*100)) / 100
    }

    alignerStep = 0.05
    minAligner = 0 // min = step
    maxAligner = 3 + this.alignerStep

    changerAligner(value){

        if(
            alignerNumber + value > this.minAligner
            &&
            alignerNumber + value < this.maxAligner
        ){

            alignerNumber = this.roundToMultiple(alignerNumber + value, this.alignerStep)

        }

    }

    getAlignerNumber(){

        return alignerNumber

    }

    aligner(number, alignment = this.getAlignerNumber()){

        return this.roundToMultiple(number, alignment)

    }

    drawCentralLine(){

        ScreenRender.drawLine({
            "positions": [
                [
                    -ScreenRender.mainCanvas.offsetWidth*2,
                    0,
                ],
                [
                    ScreenRender.mainCanvas.offsetWidth*2,
                    0,
                ]
            ]
        })

        ScreenRender.drawLine({
            "positions": [
                [
                    0,
                    -ScreenRender.mainCanvas.offsetHeight*3,
                ],
                [
                    0,
                    ScreenRender.mainCanvas.offsetHeight*3,
                ]
            ]
        })

    }

    drawCentralCircles(loop, mult, init){

        if(loop <= 0){return}

        ScreenRender.drawCircle({
            "x": 0,
            "y": 0,
            "radius": init,
            "lineWidth": 1 / ScreenRender.getZoom(),
        })

        ScreenRender.drawCentralCircles(
            loop - 1,
            mult,
            init * mult,
        )

    }

    drawShipDefaultBox(loop, div, step){

        let object = {
            "width": 6,
            "height": 6,
        }

        if(loop <= 0){return}

        ScreenRender.drawLine({

            "lineWidth": 1 / ScreenRender.getZoom(),
            "positions": [
                [
                    this.aligner(0 - object.width / div),
                    this.aligner(0 - object.height / div)
                ],[
                    this.aligner(0 + object.width / div),
                    this.aligner(0 - object.height / div)
                ],[
                    this.aligner(0 + object.width / div),
                    this.aligner(0 + object.height / div)
                ],[
                    this.aligner(0 - object.width / div),
                    this.aligner(0 + object.height / div)
                ],
                [
                    this.aligner(0 - object.width / div),
                    this.aligner(0 - object.height / div)
                ],
            ]

        })

        ScreenRender.drawShipDefaultBox(
            loop - 1,
            div + step,
            step + step,
        )

    }

    drawShipFront(){

        ScreenRender.drawLine({
            "color":"gray",
            "lineWidth": 1 / ScreenRender.getZoom(),
            "positions":[
                [
                    0,
                    0
                ],[
                    0,
                    0 + 20
                ]
            ]
        })

    }

    drawDrawLines(){

        this.reset()

        let multAlignerNumber = Math.min(
            ScreenRender.getAlignerNumber(),
            1
        )

        for (
            let index = -this.aligner(ScreenRender.mainCanvas.offsetHeight / 2, ScreenRender.getAlignerNumber() * 100) * multAlignerNumber;
            index < (ScreenRender.mainCanvas.offsetHeight / 2) * multAlignerNumber;
            index += ScreenRender.getAlignerNumber()
        ){

            ScreenRender.drawLine({
                "color": "rgb(69, 69, 69)",
                "lineWidth": 1 / ScreenRender.getZoom(),
                "positions": [
                    [
                        -(ScreenRender.mainCanvas.offsetWidth / 4) * multAlignerNumber,
                        index
                    ],
                    [
                        (ScreenRender.mainCanvas.offsetWidth / 4) * multAlignerNumber,
                        index
                    ]
                ]
            })

        }

        for (
            let index = -this.aligner(ScreenRender.mainCanvas.offsetWidth / 4, ScreenRender.getAlignerNumber() * 100) * multAlignerNumber;
            index < (ScreenRender.mainCanvas.offsetWidth / 4) * multAlignerNumber;
            index += this.getAlignerNumber()
        ) {

            ScreenRender.drawLine({
                "color": "rgb(69, 69, 69)",
                "lineWidth": 1 / ScreenRender.getZoom(),
                "positions": [
                    [
                        index,
                        -(ScreenRender.mainCanvas.offsetHeight / 2) * multAlignerNumber
                    ],
                    [
                        index,
                        (ScreenRender.mainCanvas.offsetHeight / 2) * multAlignerNumber
                    ]
                ]
            })
        }

        ScreenRender.resetCanvas()

    }

    getMainCanvasZero(string){

        return tableMainCanvasZero[string]

    }

    setMainCanvasZero(string, number){

        tableMainCanvasZero[string] = number

    }

    zoomStep = 16
    minZoom = 0 // min = step
    maxZoom = (128 * 10) + this.zoomStep

    changerZoom(value){

        if(
            zoom + value > this.minZoom
            &&
            zoom + value < this.maxZoom
        ){
            zoom += value
        }

    }

    changerRadian(value){

        radian += value

    }

    getZoom(){
        return zoom
    }

    getRadian(){
        return radian
    }

    applyConfig(config){

        this.setCanvasState(
            config.offset,
            config.rotation,
            config.canvasScale
        )

    }

    reset(){

        ScreenRender.resetCanvas()

        this.setCanvasState(
            {
                "x": this.getMainCanvasZero("width"),
                "y": this.getMainCanvasZero("height")
            },
            this.getRadian(),
            this.getZoom()
        )

    }

    setCanvasState(translate, rotate, scaleX, scaleY = scaleX){

        ScreenRender.mainCanvasContext.translate(
            translate.x,
            translate.y
        )

        ScreenRender.mainCanvasContext.rotate(
            rotate
        )

        ScreenRender.mainCanvasContext.scale(
            scaleX,
            scaleY
        )

    }

    update(){

        ScreenRender.resetCanvas()
        ScreenRender.clean()

        ScreenRender.drawDrawLines() // expensive....?

        ScreenRender.mainCanvasContext.translate(
            this.getMainCanvasZero("width"),
            this.getMainCanvasZero("height")
        )

        ScreenRender.mainCanvasContext.rotate(
            this.getRadian()
        )

        ScreenRender.drawCentralLine()

        ScreenRender.mainCanvasContext.scale(
            this.getZoom(),
            this.getZoom()
        )

        ScreenRender.drawCentralCircles(
            8,
            2,
            1
        )

        ScreenRender.drawShipFront()

        ScreenRender.drawShipDefaultBox(
            5,
            1,
            0.25
        )

        let objects = AnimationFrame.getCurrentFrame().return(true)

        ComplexRender.renderComplexFormat(objects)

    }

    radianStep = (Math.PI / 180) * 11.25

    addTriggers(){

        AnimationFrame.getGeralObserver().add(
            
            (GraphicList) => {// hit when a new frame is created

            GraphicList.getGraphicListObserver().add({
                "func": "update",
                "class": this
            })
        
        })

        AnimationFrame.passFor(// hit the first frame
            (GraphicList) => {

                GraphicList.getGraphicListObserver().add({
                    "func": "update",
                    "class": this
                })

            }
        )

        this.mainCanvas.addEventListener("click", function(e){

            MainCanvasObserver.run(e)

            if(e["ctrlKey"]){
                ScreenRender.setMainCanvasZero("width", e.offsetX)
                ScreenRender.setMainCanvasZero("height", e.offsetY)

                ScreenRender.update()

            }else{
                callback(e)
            }

        })

        document.querySelector("html").addEventListener("wheel", (e) => {

            let radianStep = this.radianStep
            let zoomStep = this.zoomStep
            let alignerStep = this.alignerStep

            if (e.deltaY > 0) {

                zoomStep = -zoomStep
                alignerStep = -alignerStep

            } else {

                radianStep = -radianStep

            }

            if(e["shiftKey"]){
                ScreenRender.changerRadian(radianStep)
            }

            if(e["altKey"]){

                ScreenRender.changerAligner(alignerStep)

            }

            if(
                !e["shiftKey"]
                &&
                !e["altKey"]
            ){
                ScreenRender.changerZoom(zoomStep)
            }

            ScreenRender.update()
    
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
            Math.PI * 2
        )
        
        if(params.fill){
            ScreenRender.mainCanvasContext.fill()
        }else{
            ScreenRender.mainCanvasContext.stroke()
        }
        

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

        if(params.fill){
            ScreenRender.mainCanvasContext.fill()
        }else{
            ScreenRender.mainCanvasContext.stroke()
        }

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
        if(params.fill){
            ScreenRender.mainCanvasContext.fill()
        }else{
            ScreenRender.mainCanvasContext.stroke()
        }
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