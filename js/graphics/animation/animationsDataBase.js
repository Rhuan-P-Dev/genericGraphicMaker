
import { GameStateController } from "../../gameState/gameStateController.js"

var GameState = ""

onInit(function(){

    GameState = new GameStateController()

})

export class AnimationsDataBase {

    constructor(){

    }

    database = {
        "caveira": {
            /*"bola": {
                "func": "drawLine",

                "loop": 60,
                "frameInterval": 1,
                "frameIntervalIncremental": 1,

                "frameInterpolation": "linar",

                "frameRate": 60,
                
                "frames": [
                    {
                        0: {
                            0: 500,
                            1: 250,
                        },
                        1: {
                            0: 50,
                            1: 50
                        },
                        2: {
                            0: 800,
                            1: 900
                        },
                    },{
                        1: {
                            0: 800,
                            1: 180
                        }
                    },{
                        1: {
                            0: 251,
                            1: 251,
                        }
                    },{
                        0: {
                            0: 800,
                            1: 500,
                        },
                        1: {
                            0: 500,
                            1: 400,
                        }
                    },
                ]
            },*/
            "sim": {
                "func": "drawLine",

                "loop": 1,
                "frameInterval": 1,
                "frameIntervalIncremental": 1,

                "frameInterpolation": "linar",

                "seconds": 10,
                "frameRate": 60, // hardcoded?
                
                "frames": [
                    {
                        0: {
                            0: 500,
                            1: 250,
                        },
                        1: {
                            0: 50,
                            1: 50
                        },
                        2: {
                            0: 600,
                            1: 50
                        }
                    },{
                        1: {
                            0: 800,
                            1: 180
                        }
                    },{
                        0: {
                            0: 0,
                            1: 180
                        }
                    },{
                        1: {
                            0: -1,
                            1: 999
                        }
                    },{
                        0: {
                            0: 9999,
                        }
                    },{
                        2: {
                            1: 100,
                        }
                    }
                    
                ]
            },
        },
        "heal": {
            "simbo": {
                "func": "drawLine",

                "loop": 1,
                "frameInterval": 1,
                "frameIntervalIncremental": 1,

                "frameInterpolation": "linar",

                "seconds": 0.2,
                "frameRate": 60, // hardcoded?
                
                "frames": [
                    {
                        0: {
                            0: -20,
                            1: 0,
                        },
                        1: {
                            0: 0,
                            1: 0,
                        },
                        2: {
                            0: 0,
                            1: -25
                        },
                        3: {
                            0: 0,
                            1: 0
                        },
                        4: {
                            0: 20,
                            1: 0
                        },
                        5: {
                            0: 0,
                            1: 0
                        },
                        6: {
                            0: 0,
                            1: 40
                        }
                        
                    },{
                        6: {}
                    },
                    
                ]
            },
        },
    }

    get(animation){
        return this.database[animation]
    }

}