import { onInit } from "../misc/miscFunctions.js"
import { GraphicListController } from "../graphicList/graphicListController.js"

var GraphicList

onInit(function(){

    GraphicList = new GraphicListController()

})


export class DownloadController {

    downloadButton = document.getElementById("download")

    addTriggers() {

        this.downloadButton.addEventListener("click", () => {

            let data = GraphicList.getDownload()
    
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
    
        })

    }

    downloader(name, data) {

        let a = document.createElement("a")
    
        a.href = window.URL.createObjectURL(new Blob([data], {type: "text/plain"}))
    
        a.download = name
    
        a.click()
                
    }

}