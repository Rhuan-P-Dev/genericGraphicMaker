import { expect } from "https://deno.land/x/expect/mod.ts"
import * as mod from "https://deno.land/std@0.212.0/assert/mod.ts"

import { GraphicList } from "../../../../../js/misc/miscClass.js"


function randomUniqueID() {
    return "ID"+randomInteger(0, 2**52)
}


function randomInteger(min = 0, max = 1){
    return Math.floor(Math.random() * (max - min + 1)) + min;
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

function makeTest(array){

    const GraphicListTest = new GraphicList()

    var randomIDArray = []

    for (let index = 0; index < array.length; index++) {

        let randomID = randomUniqueID()

        GraphicListTest.add(array[index], randomID)

        randomIDArray.push(randomID)
        
    }

    for (let index = 0; index < array.length; index++) {

        let randomIndex = randomInteger(0,randomIDArray.length-1) 

        expect(
            GraphicListTest.get(
                randomIDArray[randomIndex],
            ).value
        ).toEqual(array[randomIndex])

    }

}

Deno.test("GraphicList - get() - normal values", () => {

    makeTest([
        1,
        8,
        -6,
        127,
        -568,
        61,
        912,
        -123,
        91,
        -12,
    ])

})

Deno.test("GraphicList - get() - single element", () => {

    makeTest([
        5
    ])

})

Deno.test("GraphicList - get() - null, undefined, false", () => {

    makeTest([
        null,
        undefined,
        false,
        NaN
    ])

})

Deno.test("GraphicList - get() - large positive number", () => {

    makeTest([
        Number.MAX_SAFE_INTEGER
    ])

})

Deno.test("GraphicList - get() - misc", () => {

    makeTest([
        123,
        123,
        123,
        123,
        123,
        123,
        1,
        true,
        8,
        -6,
        {},
        127,
        -568,
        "32534634",
        61,
        () => {console.log("Hello World")},
        912,
        -Number.MAX_SAFE_INTEGER,
        -123,
        91,
        new GraphicList(),
        -12,
        Number.MAX_SAFE_INTEGER,
        [],
        makeTest,
    ])

})

Deno.test("GraphicList - get() - random - 2**20 | 250", () => {

    var addArray = []

    for (let index = 0; index < randomInteger(2,2**20); index++) {

        addArray.push(randomInteger((-2)**21,2**20))
        addArray.push(randomFloat(1,2**20))
        addArray.push(
            returnRandomCharacter(
                randomInteger(1,250)
            )
        )
        
    }

    makeTest(addArray)

})

Deno.test("GraphicList - get() - fail", () => {

    const GraphicListTest = new GraphicList()

    GraphicListTest.add(321, "123")

    expect(
        GraphicListTest.get("456")
    ).toEqual(false)

})