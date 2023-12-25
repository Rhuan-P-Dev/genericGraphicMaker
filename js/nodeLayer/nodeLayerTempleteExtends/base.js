
export class NodeLayerBase {

    instructions = [
        {
            "type":"boolean",
            "text": "scale: ",
            "default": true,
            "keyUpdate": "scale"
        },{
            "type": "color",
            "keyUpdate": "color",

        },{
            "type":"boolean",
            "text": "objectColor: ",
            "default": false,
            "keyUpdate": "objectColor"
        }
    ]

    graphicListData = {
        "scale": true,
        "objectColor": false,
        "color": "black",
    }

}