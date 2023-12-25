import { setFrameOut } from "../frame/frameController.js"
import { GameStateController } from "../gameState/gameStateController.js"
import { ScreenRenderController } from "./screenRenderController.js"

var GameState = ""
var ScreenRender = ""

onInit(function(){

    GameState = new GameStateController()
    ScreenRender = new ScreenRenderController()

})

export class StatusbarController {

    update(){

        let allObjectsRenderable = GameState.getAllObjectsRender()

        for(let objectName in allObjectsRenderable){
            let object = allObjectsRenderable[objectName]

            if(object.priority < 3){continue}

            Statusbar.renderStatus(object)

        }

    }

    renderStatus(object){

        let HP = {
            "start": {
                "x": 25,
                "y": object.height * 2,
            },
            "end": {
                "x": 25,
                "y": object.height * 2,
            },
            "formula": (object.life / object.maxLife),
            "lineWidth": 2,
            "color": "red"
        }

        let ENERGY = {
            "start": {
                "x": 25,
                "y": -object.height * 2,
            },
            "end": {
                "x": 25,
                "y": -object.height * 2,
            },
            "formula": (object.energy / object.maxEnergy),
            "lineWidth": 2,
            "color": "yellow"
        }

        this.renderStat(
            object,
            {
                "start": HP.start,
                "end": HP.end,
                "formula": HP.formula,
                "lineWidth": HP.lineWidth,
                "color": HP.color
            }
        )

        this.renderStat(
            object,
            {
                "start": ENERGY.start,
                "end": ENERGY.end,
                "formula": ENERGY.formula,
                "lineWidth": ENERGY.lineWidth,
                "color": ENERGY.color
            }
        )

        let VEL = {
            "start": {
                "x": 25,
                "y": -object.height * 3,
            },
            "end": {
                "x": 25,
                "y": -object.height * 3,
            },
            "formula": (
                (parsePositive(object.currentXVel) + parsePositive(object.currentYVel)) / object.maxVel
            ),
            "lineWidth": 2,
            "color": "blue"
        }

        this.renderStat(
            object,
            {
                "start": VEL.start,
                "end": VEL.end,
                "formula": VEL.formula,
                "lineWidth": VEL.lineWidth,
                "color": VEL.color
            }
        )

        if(!object.shield){return}

        let SHIELD = {
            "start": {
                "x": 25,
                "y": object.height * 3,
            },
            "end": {
                "x": 25,
                "y": object.height * 3,
            },
            "formula": (object.shield / object.maxShield),
            "lineWidth": 2,
            "color": "lightblue"
        }

        this.renderStat(
            object,
            {
                "start": SHIELD.start,
                "end": SHIELD.end,
                "formula": SHIELD.formula,
                "lineWidth": SHIELD.lineWidth,
                "color": SHIELD.color
            }
        )


    }

    renderStat(object, params){

        ScreenRender.addDrawRequest(
            {
                "func": ScreenRender.fillArea,
                "params": {
                    "positions": [
                        [
                            (object.x - params.start.x) - params.lineWidth,
                            (object.y - params.start.y) + params.lineWidth
                        ],
                        [
                            ((object.x - params.end.x ) + params.start.x*2) + params.lineWidth,
                            (object.y - params.end.y) + params.lineWidth
                        ],
                        [
                            ((object.x - params.end.x ) + params.start.x*2) + params.lineWidth,
                            (object.y - params.end.y) - params.lineWidth
                        ],
                        [
                            (object.x - params.start.x) - params.lineWidth,
                            (object.y - params.start.y) - params.lineWidth
                        ],
                    ],
                    "color": "black",
                    "lineWidth": params.lineWidth
                }
            }
        
        )

        ScreenRender.addDrawRequest(
            {
                "func": ScreenRender.drawLine,
                "params": {
                    "positions": [
                        [
                            object.x - params.start.x,
                            object.y - params.start.y,
                        ],[
                            (object.x - params.end.x) + alwaysPositive( (params.start.x*2) * params.formula ),
                            object.y - params.end.y,
                        ]
                    ],
                    "color": params.color,
                    "lineWidth": params.lineWidth
                }
            }
        
        )

    }

}

var Statusbar = new StatusbarController()