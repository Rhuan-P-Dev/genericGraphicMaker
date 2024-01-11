
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
        },{ // gambiara / Hack
            "type":"number",
            "step": 1,
            "keyUpdate": "lineWidth",
            "placeholder": "Line Width"
        }
    ]

    graphicListData = {
        "scale": true,
        "objectColor": false,
        "color": "black",
        // gambiara / Hack
        "lineWidth": 1
    }

}