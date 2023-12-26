import { ScreenRenderController } from "../../graphics/screenRenderController.js"

var ScreenRender

onInit(function(){

    ScreenRender = new ScreenRenderController()

})

export class MainCanvasController {

    canvas = document.getElementById("mainCanvas")
    box = document.getElementById("mainCanvasBox")

    init(){
        this.resize()
    }

    resize(){

        this.canvas.width = this.box.offsetWidth
        this.canvas.height = this.box.offsetHeight

        ScreenRender.update()

    }

}