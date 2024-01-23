import { expect } from "https://deno.land/x/expect/mod.ts"
import * as mod from "https://deno.land/std@0.212.0/assert/mod.ts"

import { CloneObjectController } from "../../../../js/generalUtils/cloneObject.js"

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

function makeTest(array, expectedResult = "equal"){

    const CloneObject = new CloneObjectController()

    for (let index = 0; index < array.length; index++) {

        if(expectedResult === "equal"){

            expect(
                CloneObject.cloneAttribute(array[index])
            ).toEqual(
                array[index]
            )

        }else{
            mod.assert(
                CloneObject.cloneAttribute(array[index])
                !==
                array[index]
            )
        }
        
    }

}

Deno.test("CloneObjectController - cloneAttribute() - normal values", () => {

    makeTest([
        {
            name: "name",
            value: 425764725,
            "red": "blue"
        },{
            "lorem": "ipsolum",
            232: "dolor",
        }

    ])

})

Deno.test("CloneObjectController - cloneAttribute() - large number", () => {

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

Deno.test("CloneObjectController - cloneAttribute() - misc", () => {

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

Deno.test("CloneObjectController - cloneAttribute() - random - 2**20 | 250", () => {

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

Deno.test("CloneObjectController - cloneAttribute() - fail - null, undefined and false", () => {

    makeTest([
        {
            "is": null,
        },{
            "or": undefined,
        },{
            "maybe": false,
        }
    ], "different")

})

Deno.test("CloneObjectController - cloneAttribute() - fail - function and class", () => {

    makeTest([
        {
            "is": () => {console.log("function")},
        },{
            "or": new CloneObjectController(),
        }
    ], "different")

})

Deno.test("CloneObjectController - cloneAttribute() - fail - objects", () => {

    makeTest([
        {
            "1": [],
        },{
            "2": {},
        }
    ], "different")

})