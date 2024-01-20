
// don't work on deno?

/*

import { expect } from "https://deno.land/x/expect/mod.ts"
import * as mod from "https://deno.land/std@0.212.0/assert/mod.ts"

import { InheritController } from "../../../../js/generalUtils/inherit.js"
import { BasicLinkedList } from "../../../../js/misc/miscClass.js"

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

function makeTest(array, object = new class{}){

    const Inherit = new InheritController()

    let excludeKeys = {}

    let result = true

        Inherit.inherit(
            object,
            array,
        )


    console.log(
        object
    )

    return


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

class test {

    name = "name"
    value = 425764725
    "red" = "blue"

    abc(){
        return this.name
    }

}

Deno.test("InheritController - propertieClone() - normal values", () => {

    let a = BasicLinkedList
    let b = new InheritController()

    makeTest([a],b)

})

*/