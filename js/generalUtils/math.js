
export class CustomMathController {

    linear(current, max){

        return current / max

    }

    linearReverse(current, max){

        return 1 - this.linear(current, max)
    
    }

    inverter(number){

        return number - (number * 2)

    }

    exponential(number, expo){
        return Math.pow(number, expo)
    }

    diminishingReturns(start, factor) {

        let result = 0
    
        if (factor > 0){
            result = start * Math.pow((1 + factor), start)
        } else{
            result = start / Math.pow((1 - factor), start)
        }
    
        return result
        
    }

}