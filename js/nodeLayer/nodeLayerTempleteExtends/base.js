
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
            "title": "color"

        },{
            "type":"boolean",
            "text": "objectColor: ",
            "default": false,
            "keyUpdate": "objectColor"
        },{ // gambiara / Hack
            "type":"number",
            "step": 1,
            "keyUpdate": "lineWidth",
            "placeholder": "Line Width",
            "title": "Line Width"
        },{
            "type": "boolean",
            "default": false,
            "text": "fill: ",
            "step": 1,
            "keyUpdate": "fill",
        }
    ]

    graphicListData = {
        "scale": true,
        "objectColor": false,
        "color": "black",
        // gambiara / Hack
        "lineWidth": 1,
        "fill": false,
        // generic
        "reference": undefined,
        "offset": {
            "x": 0,
            "y": 0
        },
        "rotation": 0,
        "canvasScale": 0
    }

}