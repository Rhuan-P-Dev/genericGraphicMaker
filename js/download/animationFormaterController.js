
export class AnimationFormaterController {

    format(frames){

        let result = {}

        let lastPositions = {}
        
        for (let index = 0; index < frames.length; index++) {

            /*

            ID
            NEXT
            VALUE: {
                PARAMS
                FUNCTION
            }

            */

            let currentInfo = frames[index].return()

            let nextInfo = undefined

            if(frames[index + 1]){
                nextInfo = frames[index + 1].return()
            }

            let indey = 0

            while(currentInfo.next){

                if(result[indey] === undefined){
                    result[indey] = {}
                }

                if(lastPositions[indey] === undefined){
                    lastPositions[indey] = {}
                }

                for(let param in currentInfo.value.params){

                    if(result[indey][param] === undefined){
                        result[indey][param] = []
                    }

                    if(lastPositions[indey][param] === undefined){
                        lastPositions[indey][param] = []
                    }

                    this.processTypes[param](currentInfo, nextInfo, result[indey][param], lastPositions[indey][param], index, param)

                }

                currentInfo = currentInfo.next
                if(nextInfo){
                    nextInfo = nextInfo.next
                }

                indey++

            }
            
        }

        return this.formatAnimationResult(frames[0].return(), result)

    }

    processTypes = {
        "scale": () => {},
        "canvasScale": () => {},
        "objectColor": () => {},
        "offset": () => {},
        "reference": () => {},
        "rotation": () => {},
        "xMirror": () => {},
        "yMirror": () => {},
        "xyMirror": () => {},
        

        "positions": this.processPositions,
        

        "x": this.processXY,
        "y": this.processXY,

        "radius": this.processInt,

        "text": this.processText,
        "fontSize": this.processInt,

        "startAngle": this.processInt,
        "endAngle": this.processInt,

        "fill": this.processInt,
        "lineWidth": this.processInt,
        "color": this.processColor,
        
    }

    processPositions(currentInfo, nextInfo, result, lastPositions, index){

        let currentPositions = currentInfo.value.params.positions
        let nextPositions = undefined

        if(nextInfo){
            nextPositions = nextInfo.value.params.positions
        }

        if(
            index !== 0
            &&
            nextPositions
            &&
            AnimationFormater.deepArrayIsEqual(currentPositions, nextPositions)
        ){
            return
        }

        let created = false

        for (let indey = 0; indey < currentPositions.length; indey++) {

            let current = currentPositions[indey]

            let diff = {}

            for(let indez in current ){

                if(
                    lastPositions[indey]
                    &&
                    current[indez] !== lastPositions[indey][indez]
                ){
                    diff.diff = true

                    if(!diff[indey]){
                        diff[indey] = {}
                    }

                    diff[indey][indez] = true

                }

            }

            if(
                index === 0
                ||
                diff.diff
            ){

                if(!created){
                    result.push({})
                    created = true
                }

                if(!result[result.length - 1][indey]){
                    result[result.length - 1][indey] = {}
                }

                if(!lastPositions[indey]){
                    lastPositions[indey] = {}
                }

                for (let indez = 0; indez < current.length; indez++) {

                    if(
                        index === 0
                        ||
                        diff[indey][indez]
                    ){
                        result[result.length - 1][indey][indez] = current[indez]
                        lastPositions[indey][indez] = current[indez]
                    }

                }

            }

        }

    }

    processXY(currentInfo, nextInfo, result, lastPositions, index){

        if(!lastPositions.x === undefined){
            lastPositions = {}
        }

        let currentXY = {
            "x": currentInfo.value.params.x,
            "y": currentInfo.value.params.y
        }

        let nextXY = undefined

        if(nextInfo){

            nextXY = {
                "x": nextInfo.value.params.x,
                "y": nextInfo.value.params.y
            }

        }

        if(
            index !== 0
            &&
            nextXY
            &&
            currentXY.x === nextXY.x
            &&
            currentXY.y === nextXY.y
        ){
            return
        }

        let diff = {}

        if(
            currentXY.x !== lastPositions.x
        ){
            diff.x = true
        }

        if(
            currentXY.y !== lastPositions.y
         ){
            diff.y = true
        }

        if(
            index === 0
            ||
            diff.x
            ||
            diff.y
        ){

            result.push({})

            if(diff.x){
                result[result.length - 1].x = currentXY.x
                lastPositions.x = currentXY.x
            }
            
            if(diff.y){
                result[result.length - 1].y = currentXY.y
                lastPositions.y = currentXY.y
            }

        }

    }

    processInt(currentInfo, nextInfo, result, lastPositions, index, currentParam){

        let currentInt = currentInfo.value.params[currentParam]

        let nextInt = undefined

        if(nextInfo){

            nextInt = nextInfo.value.params[currentParam]

        }

        if(
            index !== 0
            &&
            nextInt !== undefined
            &&
            nextInt === currentInt
        ){
            return
        }

        let diff = false

        if(
            currentInt !== lastPositions[0]
        ){
            diff = true
        }

        if(
            index === 0
            ||
            diff
        ){

            result.push({})

            result[result.length - 1] = currentInt
            lastPositions[0] = currentInt

        }

    }

    processText(currentInfo, nextInfo, result, lastPositions, index, currentParam){

        let currentText = currentInfo.value.params[currentParam]

        let nextText = undefined

        if(nextInfo){

            nextText = nextInfo.value.params[currentParam]

        }

        if(
            index !== 0
            &&
            nextText
            &&
            AnimationFormater.arraysEqual(currentText, nextText)
        ){
            return
        }

        let diff = false

        if(
            lastPositions[0] !== undefined
            &&
            !AnimationFormater.arraysEqual(currentText, lastPositions[0])
        ){
            diff = true
        }

        if(
            index === 0
            ||
            diff
        ){

            result.push({})

            result[result.length - 1] = currentText
            lastPositions[0] = currentText

        }

    }

    processColor(currentInfo, nextInfo, result, lastPositions, index, currentParam){

        let currentColor = hexToRgb(currentInfo.value.params[currentParam]) || currentInfo.value.params[currentParam]

        let nextColor = undefined

        if(nextInfo){

            nextColor = hexToRgb(nextInfo.value.params[currentParam]) || nextInfo.value.params[currentParam]

        }

        if(
            index !== 0
            &&
            nextColor
            &&
            AnimationFormater.arraysEqual(currentColor, nextColor)
        ){
            return
        }

        let diff = false

        if(
            lastPositions[0]
            &&
            !AnimationFormater.arraysEqual(currentColor, lastPositions[0])
        ){
            diff = true
        }

        if(
            index === 0
            ||
            diff
        ){

            result.push({})

            result[result.length - 1] = currentColor
            lastPositions[0] = currentColor

        }

    }

    deepArrayIsEqual(arr1, arr2) {

        if (arr1.length !== arr2.length) {
            
            return false
  
        }

        for (let index = 0; index < arr1.length; index++) {

            if(!this.arraysEqual(arr1[index], arr2[index])){

                return false

            }

        }

        return true

    }

    arraysEqual(arr1, arr2) {

        if (arr1.length !== arr2.length) {

            return false

        }

        for (let index = 0; index < arr1.length; index++) {

            if (arr1[index] !== arr2[index]) {

                return false

            }

        }

        return true

    }

    formatationNames = {
        "x": "xy",
        "y": "xy",
        "positions": "continuous",
    }

    specialFormatation = {
        "color": this.formatationColor
    }

    formatAnimationResult(currentInfo, result){
        
        let index = 0

        let newResult = {}

        while(currentInfo.next){

            newResult[index] = {
                "func": currentInfo.value.functionName,

                "loop": 1,
                "seconds": 1,
                "frameRate": 60, // hardcoded?
                
                "frames": {}
            }

            for(let param in result[index]) {

                if(result[index][param][0] !== undefined){

                    if(this.specialFormatation[param]){

                        result[index][param] = this.specialFormatation[param](result[index][param])

                    }


                    newResult[index].frames[this.formatationNames[param] || param] = result[index][param]
                }

            }

            currentInfo = currentInfo.next

            index++

        }

        return newResult

    }

    formatationColor(colorsArray){

        let newColorsArray = []

        for (let index = 0; index < colorsArray.length; index++) {

            newColorsArray.push({})

            newColorsArray[newColorsArray.length - 1]["0"] = {}

            for (let indey = 0; indey < colorsArray[index].length; indey++) {

                newColorsArray[newColorsArray.length - 1]["0"][indey] = colorsArray[index][indey]
                
            }

        }

        return newColorsArray

    }

}

var AnimationFormater = new AnimationFormaterController()

function hexToRgb(hex) {

    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

    return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ] : null

}