
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
            "keyUpdate": "fill",
        },{
            "type": "boolean",
            "default": false,
            "text": "X Mirror: ",
            "keyUpdate": "xMirror",
        },{
            "type": "boolean",
            "default": false,
            "text": "Y Mirror: ",
            "keyUpdate": "yMirror",
        },{
            "type": "boolean",
            "default": false,
            "text": "XY Mirror: ",
            "keyUpdate": "xyMirror",
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
        "canvasScale": 0,
        "xMirror": false,
        "yMirror": false,
        "xyMirror": false,
    }

}