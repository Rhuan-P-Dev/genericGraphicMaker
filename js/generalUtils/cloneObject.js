
export class CloneObjectController {

    cloneSimple(object, clonedObject = {}){

        return this.cloneAttribute(object, clonedObject)

    }

    cloneObject(object, clonedObject = {}){

        for (let key in object) {

            if(typeof(object[key]) == "object"){

                this.cloneObjectFunctions[key](
                    object,
                    clonedObject,
                    {
                        "keyType": key
                    },
                )

            }
            
        }

        return clonedObject

    }

    cloneAttribute(object, clonedObject = {}){

        for (let key in object) {

            if(
                typeof(object[key]) == "object"
                ||
                typeof(object[key]) == "function"
            ){
                continue
            }

            clonedObject[key] = object[key]

        }

        return clonedObject
    }

    recursiveCloneAttribute(object, clonedObject = {}, overwrite = false){

        let dummy = object

        for (let key in object) {

            if(clonedObject[key] !== undefined){

                if(typeof(clonedObject[key]) == "object"){

                    this.recursiveCloneAttribute(dummy[key], clonedObject[key])
                    continue

                }

                if(overwrite){

                    clonedObject[key] = object[key]

                }

            }else{

                if(object[key] == undefined){
                    clonedObject[key] = object[key]
                    continue
                }

                if(
                    typeof(object[key]) == "object"
                    &&
                    object[key].constructor.name == "Array"
                    ||
                    object[key].constructor.name == "Object"
                ){

                    clonedObject[key] = new object[key].constructor

                    this.recursiveCloneAttribute(dummy[key], clonedObject[key])

                }else{
                    
                    clonedObject[key] = object[key]

                }

            }

        }

        return clonedObject
        
    }

}

var CloneObject = new CloneObjectController()