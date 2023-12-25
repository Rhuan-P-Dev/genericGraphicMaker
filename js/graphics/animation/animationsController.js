
import { setFrameOut } from "../../frame/frameController.js"
import { GameStateController } from "../../gameState/gameStateController.js"
import { CloneObjectController } from "../../generalUtils/cloneObject.js"
import { ScreenRenderController } from "../screenRenderController.js"
import { AnimationsDataBase } from "./animationsDataBase.js"

var GameState = ""
var ScreenRender = ""
var DataBase = ""

onInit(function(){

    GameState = new GameStateController()

    ScreenRender = new ScreenRenderController()

    //DataBase = new AnimationsDataBase()

})

export class AnimationsController {

    typeOfAnimation = {
        "absolute": absolute,
        "relative": relative,
    }

    run(animation){

        let animationData = new AnimationsDataBase().get(animation.name)

        for(let shape in animationData){

            animationData[shape] = this.interpolateFrames(animationData[shape])

            let animationArray = []

            let frameInterval = animationData[shape].frameInterval

            for (let index = 0; index < animationData[shape].loop; index++) {

                for(let frame in animationData[shape].frames){

                    let currentFrame = animationData[shape].frames[frame]

                    this.updatePositions(
                        currentFrame,
                        animationArray
                    )

                    let currentPositions = cloneArray(animationArray)

                    this.typeOfAnimation[animation.type]({
                        "func": animationData[shape].func,
                        "currentPositions": currentPositions,
                        "frameInterval": frameInterval,
                        "offset": animation.offset,
                        "frameRandomOffsetX": animation.frameRandomOffsetX,
                        "frameRandomOffsetY": animation.frameRandomOffsetY,
                    })
                    
                    frameInterval += animationData[shape].frameIntervalIncremental
        
                }
                
            }

        }

    }

    interpolateFrames(data){

        let newFrames = []

        let frameMult = (data.frameRate / (data.frames.length-1)) * data.seconds - 1

        let cachedPositions = []

        for (let index = 0; index < data.frames.length; index++) {

            if(!data.frames[index+1]){break}
            
            let currentFrame = data.frames[index]
            let nextFrame = data.frames[index+1]

            this.updatePositions(
                currentFrame,
                cachedPositions,
            )

            newFrames = new Array().concat(newFrames, this.createFrames(
                cachedPositions,
                currentFrame,
                nextFrame,
                frameMult
            ))
            
        }

        console.log(

            newFrames.length

        )

        data.frames = newFrames

        return data

    }

    createFrames(
        cachedPositions,
        currentFrame,
        nextFrame,
        frameMult
    ){

        let newFrames = [currentFrame]

        for(let index in nextFrame ){

            let interpolation_0 = (
                nextFrame[index][0] - cachedPositions[index][0]
            ) / frameMult

            let interpolation_1 = (
                nextFrame[index][1] - cachedPositions[index][1]
            ) / frameMult

            for (
                let interpolationMult = 1;
                interpolationMult <= frameMult;
                interpolationMult++
            ) {

                let currentIndex = newFrames.length

                newFrames[currentIndex] = {}
                newFrames[currentIndex][index] = {}

                if(typeof(nextFrame[index][0]) == "number"){

                    newFrames[currentIndex][index][0] = cachedPositions[index][0] + (
                        interpolation_0 * interpolationMult
                    )

                }

                if(typeof(nextFrame[index][1]) == "number"){

                    newFrames[currentIndex][index][1] = cachedPositions[index][1] + (
                        interpolation_1 * interpolationMult
                    )

                }
                
            }

        }

        return newFrames
    
    }

    updatePositions(frame, array){

        for(let index in frame ){

            if(!array[index]){
                array[index] = []
            }
    
            if(typeof(frame[index][0]) == "number"){
                array[index][0] = frame[index][0]
            }
    
            if(typeof(frame[index][1]) == "number"){
                array[index][1] = frame[index][1]
            }
    
        }

    }

}

var Animations = new AnimationsController()

function cloneArray(arr){

    let newArr = new Array()

    for (let x = 0; x < arr.length; x++) {

        for (let y = 0; y < arr[x].length; y++) {

            if(!newArr[x]){
                newArr[x] = []
            }

            newArr[x][y] = arr[x][y]
            
        }
        
    }

    return newArr

}

function absolute(params){

    setFrameOut( () => {
        
        ScreenRender.addDrawRequest(
        {
            "func": ScreenRender[params.func],
            "params": {
                "positions": params.currentPositions,
                "color": "black",
                "lineWidth": 2,
            }
        }

    )

    },
    params.frameInterval,
    1)
    
}

function relative(params){

    let randomX = randomInteger(
        -params.frameRandomOffsetX,
        params.frameRandomOffsetX
    )

    let randomY = randomInteger(
        -params.frameRandomOffsetY,
        params.frameRandomOffsetY
    )

    for (let index = 0; index < params.currentPositions.length; index++) {

        params.currentPositions[index][0] += params.offset.x + randomX
        params.currentPositions[index][1] += params.offset.y + randomY
        
    }

    absolute(params)

}