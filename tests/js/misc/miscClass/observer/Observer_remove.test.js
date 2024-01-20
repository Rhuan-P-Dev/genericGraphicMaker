import { expect } from "https://deno.land/x/expect/mod.ts"
import * as mod from "https://deno.land/std@0.212.0/assert/mod.ts"

import { Observer } from "../../../../../js/misc/miscClass.js"

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

function makeTest(array, expectedResult = true){

    const ObserverTest = new Observer()

    for (let index = 0; index < array.length; index++) {

        if(randomInteger(1,2) == 1){
            ObserverTest.add(array[index])
        }else{
            ObserverTest.add(
                {
                    "func": array[index]
                }
            )
        }
        
    }

    const arrayLenght = array.length

    for (let index = 0; index < arrayLenght; index++) {

        let randomIndex = randomInteger(0,array.length-1) 

        expect(
            ObserverTest.remove(
                array[randomIndex],
            )
        ).toEqual(expectedResult)

        array.splice(
            randomIndex,
            1
        )

    }

    if(expectedResult) {

        let node = ObserverTest.list.next

        expect(node).toEqual({})

    }

}

Deno.test("Observer - remove() - normal values", () => {

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

Deno.test("Observer - remove() - single element", () => {

    makeTest([
        5
    ])

})

Deno.test("Observer - remove() - large positive number", () => {

    makeTest([
        Number.MAX_SAFE_INTEGER
    ])

})

Deno.test("Observer - remove() - misc", () => {

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
        new Observer(),
        -12,
        Number.MAX_SAFE_INTEGER,
        [],
        makeTest,
    ])

})

Deno.test("Observer - remove() - random - 2**20 | 250", () => {

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

Deno.test("Observer - remove() - fail - null and undefined", () => {

    makeTest([
        null,
        undefined,
        null,
        false,
        NaN,
    ], false)

})