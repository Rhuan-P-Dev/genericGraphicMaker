import { VectorController } from "../../generalUtils/vector.js"

export class ttttttttttttttttttt {

    graphicRender = {

        "configurate": true,

        "map": new rotoAnimation()
    

    }

    constructor() {

        this.graphicRender.map.add({
            "functionName": "writeText",

            "params": {
                "scale": true,
                "text": "Hello World",
                "fontSize": 10,
                "x": 20,
                "y": 20,
                "color": "black"

            }
        })

        this.graphicRender.map.add({
            "functionName": "drawCircle",

            "params": {
                "scale": true,
                "x": 25,
                "y": 25,
                "radius": 10,
                "color": "white"
            }

        })

        this.graphicRender.map.add({
            "functionName": "drawLine",

            "params": {
                "scale": true,
                "objectColor": true,

                "positions": [
                    [0, 0],
                    [5, 20],
                    [-5, 20],
                    [-5, -20],
                ],

            }

        })

        this.graphicRender.map.add({
            "functionName": "fillArea",

            "params": {

                "scale": true,
                "objectColor": true,

                "positions": [
                    [0, 0],
                    [-5, -20],
                    [5, -20],
                    [5, 20],
                ],

            }

        })

        this.graphicRender.map.add({
            "functionName": "drawArc",
            "params": {
                "scale": true,
                "x": 0,
                "y": 0,
                "radius": 20,
                "startAngle": new VectorController().toRadians(40),
                "endAngle": new VectorController().toRadians(80),
            }

        })

    }

}


/*drawArc(params) {

                ScreenRender.setStyleParams(params)
        
                ScreenRender.mainCanvasContext.beginPath()
                ScreenRender.mainCanvasContext.arc(
                    params.x,
                    params.y,
                    params.radius,
                    params.startAngle,
                    params.endAngle
                )*/