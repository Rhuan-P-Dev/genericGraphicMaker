export class InheritController {

    inherit(object, array){

        for (let index = 0; index < array.length; index++) {

            let currentClass = new array[index]()

            this.prototyClone(object, currentClass)

            this.propertieClone(object, currentClass)

        }

    }

    propertieClone(object, baseObject){

        for(let key in baseObject){

            if(object[key] === undefined){

                object[key] = baseObject[key]

            }
    
        }

    }

    prototyClone(object, baseObject){

        while(Object.getPrototypeOf(baseObject.__proto__)){
            
            let currentPropretysNames = Object.getOwnPropertyNames(baseObject.__proto__)

            for (let index = 1; index < currentPropretysNames.length; index++) {

                let currentPropretyName = currentPropretysNames[index]

                let currentProprety = Object.getPrototypeOf(baseObject)[currentPropretyName]

                if(!object.hasOwnProperty(currentProprety)){
                    object.__proto__[currentPropretyName] = currentProprety
                }

            }

            baseObject = baseObject.__proto__
            
        }

    }

}