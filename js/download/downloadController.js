import { onInit } from "../misc/miscFunctions.js"
import { AnimationFrameController } from "../graphicList/animationFrameController.js"
import { AnimationFormaterController } from "./animationFormaterController.js"

var AnimationFrame
var AnimationFormater

onInit(function(){

    AnimationFrame = new AnimationFrameController()
    AnimationFormater = new AnimationFormaterController()

})

export class DownloadController {

    downloadButton = document.getElementById("download")

    addTriggers() {

        this.downloadButton.addEventListener("click", () => {

            this.downloadDraw()

            if(AnimationFrame.getGraphicListFrames().length !== 1){

                this.downloadAnimation()

            }
    
        })

    }

    downloader(name, data) {

        let a = document.createElement("a")
    
        a.href = window.URL.createObjectURL(new Blob([data], {type: "text/plain"}))
    
        a.download = name
    
        a.click()

    }

    downloadDraw(){

        let data = AnimationFrame.getCurrentFrame().getDownload()
    
        let originalNodes = JSON.stringify(data[0])
        let optimizedNodes = JSON.stringify(data[1])

        this.downloader(
            "graphic.js",
            originalNodes
        )

        this.downloader(
            "graphic-optimized.js",
            optimizedNodes
        )

    }

    downloadAnimation(){

        let frames = AnimationFrame.getGraphicListFrames()

        let animation = JSON.stringify(
            AnimationFormater.format(frames)
        )

        console.log(animation)

        this.downloader(
            "animation.js",
            animation
        )

    }

}

var Download = new DownloadController()