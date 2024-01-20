import { expect } from "https://deno.land/x/expect/mod.ts"
import * as mod from "https://deno.land/std@0.212.0/assert/mod.ts"

import { BasicLinkedList } from "../../../../../js/misc/miscClass.js"

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

    const BasicLinkedListTest = new BasicLinkedList()

    for (let index = 0; index < array.length; index++) {

        expect(BasicLinkedListTest.add(array[index])).toEqual(true)
        
    }

    let node = BasicLinkedListTest.list.next

    for (let index = 0; index < array.length; index++) {

        expect(
            node.value
        ).toEqual(array[index])

        node = node.next
        
    }

}

Deno.test("BasicLinkedList - add() - normal values", () => {

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

Deno.test("BasicLinkedList - add() - single element", () => {

    makeTest([
        5
    ])

})

Deno.test("BasicLinkedList - add() - null and undefined", () => {

    makeTest([
        null,
        undefined,
    ])

})

Deno.test("BasicLinkedList - add() - large positive number", () => {

    makeTest([
        Number.MAX_SAFE_INTEGER
    ])

})

Deno.test("BasicLinkedList - add() - misc", () => {

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
        false,
        127,
        -568,
        null,
        undefined,
        "32534634",
        61,
        () => {console.log("Hello World")},
        912,
        -Number.MAX_SAFE_INTEGER,
        -123,
        91,
        new BasicLinkedList(),
        -12,
        Number.MAX_SAFE_INTEGER,
        [],
        makeTest,
    ])

})

Deno.test("BasicLinkedList - add() - random - 2**20 | 250", () => {

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