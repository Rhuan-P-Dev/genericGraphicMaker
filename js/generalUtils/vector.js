
export class VectorController {

    triangleFactory(catetoAdjacente, catetoOposto, hipotenusa = undefined, log = false){

        if(!hipotenusa){
            hipotenusa = this.raiz(catetoAdjacente**2 + catetoOposto**2)
        }
        
        if(!catetoOposto){
            catetoOposto = this.raiz(
                hipotenusa ** 2
                -
                catetoAdjacente ** 2
            )
        }

        if(!catetoAdjacente){
            catetoAdjacente = this.raiz(
                hipotenusa ** 2
                -
                catetoOposto ** 2
            )
        }

        let sine = catetoOposto / hipotenusa
        let cosine = catetoAdjacente / hipotenusa
        let tangente = catetoOposto / catetoAdjacente

        if(log){

            console.log("cateto adjacente: " + catetoAdjacente)
            console.log("cateto oposto: " + catetoOposto)
            console.log("hipotenusa: " + hipotenusa)
            
            console.log("sine (alfa?): " + sine)
            console.log("cosine (alfa?): " + cosine)
            console.log("tangente (alfa?): " + tangente) // = sine / cosine

        }

        //console.log("INUTIL?")

        //let secante = hipotenusa / cosine

        //console.log("secante: " + secante)

        return {
            catetoAdjacente,
            catetoOposto,
            hipotenusa,
            sine,
            cosine,
            tangente
        }

    }

    raiz(value){
        return Math.sqrt(value)
    }

    toRadians(degrees){
        return ( Math.PI / 180) * degrees
    }
      
    toDegrees(radian){
        return ( radian * 180 ) / Math.PI
    }

    getTriangleSize(end, start){

        return Math.sqrt(
            ( (end.x - start.x) ** 2 )
            +
            ( (end.y - start.y) ** 2 )
        )
    
    }

    vectorNormalize(end, start){

        let size = this.getTriangleSize(end, start)

        let result = {
            "x": (end.x - start.x) / size,
            "y": (end.y - start.y) / size,
        }

        return result
    
    }

    // the name is right?
    // to use this you need to >normalizer< your inputs first
    //  1 = same direction
    // -1 = opposite direction
    //  0 = on side
    scalarProduct(p1, p2){

        return (p1.x * p2.x) + (p1.y * p2.y)
    
    }

    getAngle(y, x){
        return Math.atan2(y, x)
    }

    setAngle(angle){
        return {
            "x": Math.cos(angle),
            "y": Math.sin(angle),
        }
    }

    sumAngles(angle){

        let angleXY = this.setAngle(angle)

        return this.getAngle(
            angleXY.y,
            angleXY.x
        )

    }

    rotate(object, theta){

        let sinTheta = Math.sin(theta)
        let cosTheta = Math.cos(theta)

        let newX = object.x * cosTheta + object.y * sinTheta
        let newY = -object.x * sinTheta + object.y * cosTheta

        object.x = newX
        object.y = newY

    }

    getAngleVel(object){

        let objectVectorNormalize = this.vectorNormalize(
            {
                "x": object.x + object.currentXVel,
                "y": object.y + object.currentYVel
            },{
                "x": object.x,
                "y": object.y,
            }
        )

        return this.getAngle(
            objectVectorNormalize.y,
            objectVectorNormalize.x,
        ) || 0

    }

}