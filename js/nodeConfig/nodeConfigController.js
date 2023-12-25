
export class NodeConfigController {

    nodeConfigHTML = document.getElementById("nodeConfig")

    hidenAll(){

        let nodes = this.nodeConfigHTML.children

        for (let index = 0; index < nodes.length; index++) {

            nodes[index].style.display = "none"
            
        }

    }

    show(index){

        this.nodeConfigHTML.children[index-1].style.display = "block"

    }


}