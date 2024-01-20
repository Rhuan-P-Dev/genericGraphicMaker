import { expect } from "https://deno.land/x/expect/mod.ts"
import * as mod from "https://deno.land/std@0.212.0/assert/mod.ts"

import { InheritController } from "../../../../js/generalUtils/inherit.js"

function randomInteger(min = 0, max = 1){
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomFloat(min = 0, max = 1){
    return Math.random() * (max - min) + min
}

function returnRandomCharacter(numberOfCharacters) {
    let possibleCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < numberOfCharacters; i++) {
      result += possibleCharacters[Math.floor(Math.random() * possibleCharacters.length)];
    }
    return result;
}

function getRandomGenerator(){

    let generators = [
        randomInteger((-2)**21,2**20),
        randomFloat((-2)**21,2**20),
        returnRandomCharacter(
            randomInteger(1,250)
        ),
    ]

    return generators[Math.floor(Math.random() * generators.length)]
}

function makeTest(array, object = {}){

    const Inherit = new InheritController()

    let excludeKeys = {}

    let result = true

    for (let index = 0; index < array.length; index++) {

        Inherit.propertieClone(
            object,
            array[index],
        )
        
    }



    for(let key in object){

        for (let index = 0; index < array.length; index++) {

            for(let arrayKey in array[index]){

                if(excludeKeys[arrayKey]){
                    continue
                }

                if(key === arrayKey){
                    excludeKeys[arrayKey] = array[index][arrayKey]
                    break
                }

            }
            
        }

    }



    for(let key in object){

        let loop = Object.keys(excludeKeys).length

        for(let excludeKey in excludeKeys){

            expect(object[key]).toEqual(excludeKeys[key])

            if(
                key === excludeKey
                &&
                object[key] === excludeKeys[excludeKey]
            ){
                break
            }

            loop--
            
        }

        if(loop <= 0){
            result = false
            break
        }

    }

    expect(result).toEqual(true)

}

Deno.test("InheritController - propertieClone() - normal values", () => {

    makeTest([
        {
            name: "name",
            value: 425764725,
            "red": "blue"
        },{
            "lorem": "ipsolum",
            232: "dolor",
        },{
            "dolor": {
                "ipsum": "dolor",
                "dolor": "ipsum"
            },
        }

    ])

})

Deno.test("InheritController - propertieClone() - large number", () => {

    makeTest([
        {
            "max": Number.MAX_SAFE_INTEGER,
        },{
            "min": -Number.MAX_SAFE_INTEGER,
        },{
            "max": Number.MAX_SAFE_INTEGER,
            "min": -Number.MAX_SAFE_INTEGER,
        }

    ])

})

Deno.test("InheritController - propertieClone() - misc", () => {

    makeTest([
        {
            "misc1": 123,
            "misc2": 1,
            "misc3": true,
            "misc4": 8,
            "misc5": -6,
            "misc7": 127,
            "misc8": -568,
            "misc9": "32534634",
            "misc10": 61,
            "misc11": 912,
            "misc12": -Number.MAX_SAFE_INTEGER,
            "misc13": -123,
            "misc14": 91,
            "misc17": Number.MAX_SAFE_INTEGER,
            "misc16": -12,
        }
    ])

})

Deno.test("InheritController - propertieClone() - strange misc", () => {

    makeTest([
        {
            "1": [],
            "2": {},
            "3": new InheritController(),
            "4": () => {console.log("function")},
            "5": null,
            "6": undefined,
            "7": true,
            "8": false,
            "19": 11,
            "20": 12,
            "21": 13,
        }
    ])

})

Deno.test("InheritController - propertieClone() - random - 2**20 | 250", () => {

    var addArray = []

    for (let index = 0; index < randomInteger(2,2**20); index++) {

        let base = getRandomGenerator()
        let value = getRandomGenerator()

        addArray.push({
            [base]: value,
        })
        
    }

    makeTest(addArray)

})