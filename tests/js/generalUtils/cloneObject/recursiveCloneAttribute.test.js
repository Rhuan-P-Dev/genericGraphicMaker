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

function makeTest(array){

    const CloneObject = new CloneObjectController()

    for (let index = 0; index < array.length; index++) {

        expect(
            CloneObject.recursiveCloneAttribute(array[index])
        ).toEqual(
            array[index]
        )

    }

}

Deno.test("CloneObjectController - recursiveCloneAttribute() - shallow - normal values", () => {

    return

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

Deno.test("CloneObjectController - recursiveCloneAttribute() - shallow - large number", () => {

    return

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

Deno.test("CloneObjectController - recursiveCloneAttribute() - shallow - misc", () => {

    return

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

Deno.test("CloneObjectController - recursiveCloneAttribute() - shallow - strange misc", () => {

    return

    makeTest([
        {
            "1": [],
            "2": {},
            "3": new CloneObjectController(),
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

Deno.test("CloneObjectController - recursiveCloneAttribute() - shallow - random - 2**20 | 250", () => {

    return

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

Deno.test("CloneObjectController - recursiveCloneAttribute() - deep - normal values", () => {

    return

    makeTest([
        {
            name: "name",
            value: 425764725,
            "deep": {
                "1": "2",
                3: "4",
            },
            "red": "blue"
        },{
            "lorem": "ipsolum",
            232: "dolor",
            "deep": {}
        }

    ])

})

Deno.test("CloneObjectController - recursiveCloneAttribute() - deep - large number", () => {

    return

    makeTest([
        {
            "max": Number.MAX_SAFE_INTEGER,
            "deep": {
                "max": Number.MAX_SAFE_INTEGER,
            },
        },{
            "min": -Number.MAX_SAFE_INTEGER,
            "deep": {
                "min": -Number.MAX_SAFE_INTEGER,
            },
        },{
            "max": Number.MAX_SAFE_INTEGER,
            "min": -Number.MAX_SAFE_INTEGER,
            "deep": {
                "max": Number.MAX_SAFE_INTEGER,
                "min": -Number.MAX_SAFE_INTEGER,
            },
        }
    ])

})

Deno.test("CloneObjectController - recursiveCloneAttribute() - deep - misc", () => {

    return

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
            "deep": {
                "misc1": 123,
                "misc2": 1,
                "misc3": true,
                "misc4": 8,
                "misc5": -6,
                "misc7": 127,
                "misc8": -568,
                "misc9": "32534634",
                "misc10": 61,
                "deep": {
                    "misc1": 123,
                    "misc2": 1,
                    "misc3": true,
                    "misc4": 8,
                    "misc5": -6,
                    "misc7": 127,
                    "misc8": -568,
                    "misc9": "32534634",
                    "misc10": 61,
                    "deep": {
                        
                    },
                    "misc11": 912,
                    "misc12": -Number.MAX_SAFE_INTEGER,
                    "misc13": -123,
                    "misc14": 91,
                    "misc17": Number.MAX_SAFE_INTEGER,
                    "misc16": -12,
                },
                "misc11": 912,
                "misc12": -Number.MAX_SAFE_INTEGER,
                "misc13": -123,
                "misc14": 91,
                "misc17": Number.MAX_SAFE_INTEGER,
                "misc16": -12,
            },
            "misc11": 912,
            "misc12": -Number.MAX_SAFE_INTEGER,
            "misc13": -123,
            "misc14": 91,
            "misc17": Number.MAX_SAFE_INTEGER,
            "misc16": -12,
        }
    ])

})

Deno.test("CloneObjectController - recursiveCloneAttribute() - deep - strange misc", () => {

    makeTest([
        [
            {"a":"b"},
            ["1",56]
        ],{
            "1": [
                [1,2]
            ],
            "2": {},
            "3": new CloneObjectController(),
            "4": () => {console.log("function")},
            "5": null,
            "6": undefined,
            "deep": {
                "1": [],
                "2": {},
                "3": new CloneObjectController(),
                "4": () => {console.log("function")},
                "5": null,
                "6": undefined,
                "deep": {
                    "1": [],
                    "2": {},
                    "3": new CloneObjectController(),
                    "4": () => {console.log("function")},
                    "5": null,
                    "6": undefined,
                    "7": true,
                    "8": false,
                    "19": 11,
                    "20": 12,
                    "21": 13,
                },
                "7": true,
                "8": false,
                "19": 11,
                "20": 12,
                "21": 13,
            },
            "7": true,
            "8": false,
            "19": 11,
            "20": 12,
            "21": 13,
        }
    ])

})

Deno.test("CloneObjectController - recursiveCloneAttribute() - deep - random - 2**20 | 250", () => {

    let depth = 40

    let deepObject = {
        "a": "b",
        "deep": {}
    }

    let shallowObject = deepObject.deep

    for (let index = 0; index < depth; index++) {

        shallowObject.deep = {}
        
        for (let index = 0; index < randomInteger(2,2**20); index++) {

            let base = getRandomGenerator()
            let value = getRandomGenerator()

            shallowObject[base] = value
            
        }

        shallowObject = shallowObject.deep

    }

    makeTest([
        deepObject
    ])

})