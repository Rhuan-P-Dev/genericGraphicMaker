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
    
            data = JSON.stringify(data)
    
            this.downloader(
                "graphic.js",
                data
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