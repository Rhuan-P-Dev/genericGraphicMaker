
export class CloneObjectController {

    cloneSimple(object, clonedObject = {}){

        return this.cloneAttribute(object, clonedObject)

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

    recursiveCloneAttribute(object, clonedObject = new object.constructor, overwrite = false){

        let dummy = object

        for (let key in object) {

            if(clonedObject[key] !== undefined){

                if(typeof(clonedObject[key]) == "object"){

                    this.recursiveCloneAttribute(dummy[key], clonedObject[key], overwrite)
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

                    this.recursiveCloneAttribute(dummy[key], clonedObject[key], overwrite)

                }else{
                    
                    clonedObject[key] = object[key]

                }

            }

        }

        return clonedObject
        
    }

}

var CloneObject = new CloneObjectController()