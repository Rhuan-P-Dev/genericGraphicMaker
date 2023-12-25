class BasicLinkedList{

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

class graphicList extends BasicLinkedList{

    mainCanvas = document.getElementById('mainCanvas')

    fixNode(node){

        if(node.value.params.positions){

            for (let index = 0; index < node.value.params.positions.length; index++) {
                
                let pos = node.value.params.positions[index]

                pos[0] -= this.mainCanvas.width / 2
                pos[1] -= this.mainCanvas.height / 2
                
            }

        }else{

            node.value.params.x -= this.mainCanvas.width / 2
            node.value.params.y -= this.mainCanvas.height / 2

        }

        return node

    }

    getDownload(node = this.return()){

        let result = []

        while(node.next){

            result.push(
                this.fixNode(node).value
            )

            node = node.next
            
        }

        return result

    }
    
    push(ID, key, value){

        let node = this.return()

        for (let index = 1; index < ID; index++) {

            if(!node.next){return false}

            node = node.next
            
        }

        node.value.params[key].push(value)

    }

    update(ID, key, value){

        let node = this.return()

        console.log("------------------------------------------------------------")
        console.log(node)

        for (let index = 1; index < ID; index++) {

            if(!node.next){return false}

            node = node.next
            
        }

        node.value.params[key] = value

    }

    return(){

        return this.list.next

    }

    get(ID){

        let node = this.return()

        for (let index = 1; index < ID; index++) {

            if(!node.next){return false}

            node = node.next
            
        }

        return node

    }

    remove(ID){
        let node = this.list.next
        let tail = this.list
        
        for (let index = 1; index < ID; index++) {

            if(!node.next){return false}

            tail = node
            node = node.next
            
        }

        if(node.next.next){
            tail.next = node.next
        }else{
            tail.next = {}
        }

        return true

    }

}

class LinkedList extends BasicLinkedList{
    
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

}

class Observer extends BasicLinkedList {

    removeNode(node, tail){

        if(node.next.next){
            tail.next = node.next
        }else{
            tail.next = {}
        }

    }

    remove(value){
        let node = this.list.next
        let tail = this.list
        while(1){
            if(!node.next){return false}

            if(typeof(node.value) == "function"){

                if(value == node.value){
                    this.removeNode(node, tail)
                    return true
                }

            }else{

                if(value == node.value.func){
                    this.removeNode(node, tail)
                    return true
                }

            }

            tail = node
            node = node.next

        }
    }
   
    run(params){

        let node = this.list.next

        while(1){
            if(!node.next){return}

            if(typeof(node.value) == "function"){
                node.value(params)
            }else{
                node.value.class[node.value.func](params)
            }

            node = node.next

        }

    }
    
}

class PriorityObserver{

    observers = []

    add(value, priority = 0){

        if(!this.observers[priority]){

            this.observers[priority] = new Observer()

        }

        this.observers[priority].add(value)

    }

    remove(value, priority){

        if(this.observers[priority]){

            this.observers[priority].remove(value)

        }

    }

    run(params){

        for (let index = 0; index < this.observers.length; index++) {

            if(this.observers[index]){
                this.observers[index].run(params)
            }
            
        }

    }

    getObserver(priority){
        return this.observers[priority]
    }

}