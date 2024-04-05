import { Observer } from "../misc/miscClass.js"
import { GraphicListController } from "./graphicListController.js"

const GraphicListFrames = []
var currentGraphicList = undefined

const GeralObserver = new Observer()

export class AnimationFrameController {

    getGeralObserver(){

        return GeralObserver

    }

    init(){

        this.setCurrentFrame(0)

    }

    createFrame(){

        let newGraphicList = new GraphicListController()

        GraphicListFrames.push(newGraphicList)

        GeralObserver.run(newGraphicList)

    }

    setCurrentFrame(frame){

        currentGraphicList = GraphicListFrames[frame]

    }

    getGraphicListFrames(){

        return GraphicListFrames

    }

    getCurrentFrame(){

        return currentGraphicList

    }

    passFor(f){

        for (let index = 0; index < GraphicListFrames.length; index++) {
            
            let frame = GraphicListFrames[index]

            f(frame)
            
        }

    }

}