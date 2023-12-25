import { GameStateController } from "../gameState/gameStateController.js"

var GameState = ""

onInit(function(){

    GameState = new GameStateController()

})

export class HUDController {

    HP = document.getElementById("HP")
    energy = document.getElementById("energy")

    update(){

        let player = GameState.getPlayer()
        
        if(!player){return}

        this.HP.innerHTML = parseInt(player.life)
        this.energy.innerHTML = parseInt(player.energy)

    }
}

var HUD = new HUDController()