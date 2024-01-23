import { expect } from "https://deno.land/x/expect/mod.ts"
import * as mod from "https://deno.land/std@0.212.0/assert/mod.ts"
import { randomInteger } from "../../../../js/misc/miscFunctions.js"

function makeTest(array){

    for (let index = 0; index < array.length; index++) {

        let randomValue = randomInteger(array[index][0], array[index][1])

        expect(
            randomValue
        ).toBeGreaterThanOrEqual(array[index][0])

        expect(
            randomValue
        ).toBeLessThanOrEqual(array[index][1])

    }

}

Deno.test("BasicLinkedList - add() - positive interval", () => {

    makeTest([
        [1,8],
        [2,10],
        [353,112342],
        [4,1324],
        [5,16],
        [216,11218],
        [7,20],
        [8,22],
        [9,24],
        [10,26],
        [11,28],
        [12,30],
        [13,32],
        [14,34],
        [15,36],
        [16,38],
        [17,40],
        [18,42],
        [19,44],
    ])

})

Deno.test("BasicLinkedList - add() - misc interval", () => {

    makeTest([
        [-1,8],
        [671,53678],
        [-564671,-41],
        [-312671,3568],
    ])

})

Deno.test("BasicLinkedList - add() - negative interval", () => {

    makeTest([
        [-50, -1],
        [-5498, -60],
        [-80, -60],
        [-51, -0],
    ])

})

Deno.test("BasicLinkedList - add() - large positive number", () => {

    makeTest([
        [0, Number.MAX_SAFE_INTEGER]
    ])

})

Deno.test("BasicLinkedList - add() - large negative number", () => {

    makeTest([
        [-Number.MAX_SAFE_INTEGER, 0]
    ])

})

Deno.test("BasicLinkedList - add() - random - 2**20 | 250", () => {

    var addArray = []

    for (let index = 0; index < randomInteger(2,2**20); index++) {

        let firstValue = randomInteger((-2)**21,2**20)

        addArray.push(
            [
                firstValue,
                randomInteger(firstValue, 2**20)
            ]
        )
        
    }

    makeTest(addArray)

})