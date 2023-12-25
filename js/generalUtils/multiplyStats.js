import { CustomMathController } from "./math.js"

var CustomMath = ""

onInit(function(){

    CustomMath = new CustomMathController()

})

const multStats = {
    "normalStats":[
        "damage",

        "defense",

        "energy",
        "maxEnergy",
        "energyRegen",

        "life",
        "maxLife",
        "lifeRegen",

        "shield",
        "maxShield",
        "shieldRegen",
    ],

    "normalStats_div2": [
        "priority",

    ],

    "normalStats_div5": [
        "width",
        "height",
        
        "lifeTime",
    ],

    "invertedStatus":[
    ],

    "exponentialStatus":[
        "maxVel",
        "vel",
        "rotationVel",
    ],

    "invertedExponentialStatus": [
        "resistance",
    ],

}

export class MultiplyStatsController {

    multiply(object, mult, stats = multStats){

        if(stats.normalStats){
            this.mult(
                object,
                mult,
                stats.normalStats,
            )
        }

        if(stats.normalStats_div5){

            this.mult(
                object,
                mult / 5,
                stats.normalStats_div5,
            )

        }

        if(stats.normalStats_div2){

            this.mult(
                object,
                mult / 2,
                stats.normalStats_div2,
            )

        }

        if(stats.invertedStatus){

            this.mult(
                object,
                CustomMath.inverter(mult),
                stats.invertedStatus,
            )

        }

        if(stats.exponentialStatus){

            this.exponential(
                object,
                mult,
                stats.exponentialStatus
            )

        }

        if(stats.invertedExponentialStatus){

            this.exponential(
                object,
                CustomMath.inverter(mult),
                stats.invertedExponentialStatus
            )

        }

    }

    mult(object, mult, stats){

        for (let index = 0; index < stats.length; index++) {

            let stat = stats[index]

            if(object[stat]){
                object[stat] += object[stat] * mult
            }
            
        }

    }

    exponential(object, mult, stats){

        // the "evolutron" and the "segunda etapa" dão resutados diferentes mesmo que era para ser igual, a "segunda etapa" é melhor

        // 0.81 vs 0.87

        let penalty = 10

        for (let index = 0; index < stats.length; index++) {

            let stat = stats[index]

            if(object[stat]){

                object[stat] = CustomMath.diminishingReturns(
                    object[stat],
                    mult / penalty
                )

            }
            
        }

    }

}