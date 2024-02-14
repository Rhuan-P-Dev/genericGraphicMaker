import { randomUniqueID } from "./miscFunctions.js"

export class BasicLinkedList{

    list = {
        next:{}
    }

    add(value){
        let node = this.list.next
        while(1){
            if(!node.next){
                
                node.value = value
                node.next = {}

                return true
            }else{
                node = node.next
            }
        }
    }

}

export class GraphicList{

    list = {
        next: {}
    }

    add(value, ID = randomUniqueID()){
        let node = this.list.next
        while(1){
            if(!node.next){
                
                node.value = value
                node.ID = ID
                node.next = {}

                return ID
            }else{
                node = node.next
            }
        }
    }

    getDownload(node = this.return()){

        let result = []

        while(node.next){

            result.push(
                node.value
            )

            node = node.next
            
        }

        return result

    }
    
    push(ID, key, value){

        let node = this.return()

        while(node.next){

            if(
                node.ID == ID
                &&
                node.value.params
                &&
                node.value.params[key]
                &&
                Array.isArray(
                    node.value.params[key]
                )
            ){
                node.value.params[key].push(value)
                return true
            }

            node = node.next

        }

        return false

    }

    pop(ID, key){

        let node = this.return()

        while(node.next){

            if(
                node.ID == ID
                &&
                node.value.params
                &&
                node.value.params[key]
                &&
                Array.isArray(
                    node.value.params[key]
                )
            ){
                node.value.params[key].pop()

                return true
                
            }

            node = node.next

        }

        return false

    }

    update(ID, key, value){

        let node = this.return()

        while(
            node.next
        ){

            if(
                node.ID == ID
                &&
                node.value.params
            ){
                node.value.params[key] = value
                return true
            }

            node = node.next

        }

        return false

    }

    return(){

        return this.list.next

    }

    get(ID){

        let node = this.return()

        while(node.next){

            if(node.ID == ID){
                return node
            }

            node = node.next

        }

        return false

    }

    remove(ID){
        let node = this.list.next
        let tail = this.list
        
        while(node.next){

            if(node.ID == ID){
                
                if(node.next.next){
                    tail.next = node.next
                }else{
                    tail.next = {}
                }
        
                return true

            }

            tail = node
            node = node.next

        }

        return false

    }

}

// don't have unit tests
export class LinkedList extends BasicLinkedList{
    
    remove(value){
        let node = this.list.next
        let tail = this.list
        while(1){
            if(!node.next){return false}

            if(value == node.value){

                if(node.next.next){
                    tail.next = node.next
                }else{
                    tail.next = {}
                }

                return true
            }else{
                tail = node
                node = node.next
            }
        }
    }

    getAllInArray(){

        let node = this.list.next

        let array = []

        while(1){
            if(!node.next){return array}

            array.push(node.value)

            node = node.next

        }

    }

}// delete?

export class Observer extends BasicLinkedList {

    remove(value){
        let node = this.list.next
        let tail = this.list

        while(
            value
            &&
            node.next
        ){

            if(
                value == node.value
                ||
                value == node.value.func
            ){
                
                if(node.next.next){
                    tail.next = node.next
                }else{
                    tail.next = {}
                }

                return true
            }

            tail = node
            node = node.next

        }

        return false

    }
   
    run(params){

        let node = this.list.next

        while(node.next){

            if(typeof(node.value) == "function"){
                node.value(params)
            }else{
                node.value.class[node.value.func](params)
            }

            node = node.next

        }

    }
    
}

export class referenceNode {

    constructor(name){

        this.params = {
            "reference": name,
            "offset": {
                "x": 0,
                "y": 0
            },
            "rotation": 0,
            "canvasScale": 0
        }

    }

}