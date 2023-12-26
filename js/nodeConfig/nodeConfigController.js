
export class NodeConfigController {

    nodeConfigHTML = document.getElementById("nodeConfig")

    hidenAll(){

        let nodes = this.nodeConfigHTML.children

        for (let index = 0; index < nodes.length; index++) {

            nodes[index].style.display = "none"
            
        }

    }

    show(listID){

        let nodes = this.nodeConfigHTML.children

        for (let index = 0; index < nodes.length; index++) {

            let node = nodes[index]

            if(node.getAttribute("list_id") == listID){

                node.style.display = "block"

                return

            }

        }

    }

    delete(){

        let nodes = this.nodeConfigHTML.children

        for (let index = 0; index < nodes.length; index++) {

            let node = nodes[index]

            if(node.style.display != "none"){

                let listID = node.getAttribute("list_id")

                node.remove()

                return listID

            }
            
        }

    }

}