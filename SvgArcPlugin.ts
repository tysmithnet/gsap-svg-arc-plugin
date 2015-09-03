///<reference path="snapsvg.d.ts"/>

interface IPluginOptions {
    x:number;
    y:number;
    startAngle: number;
    arcDegrees: number;
    thickness: number;
}

function isNumeric(value:any):boolean {
    return !isNaN(parseFloat(value)) && isFinite(value);
}

class SvgArcPlugin {
    propName:string = "svgarc";
    API:number = 2;
    version:string = "1.0.2";
    target:ISvgArc;
    options:IPluginOptions;

    init(target:ISvgArc, value:IPluginOptions, tween:any):boolean {
        if (!this.validate(target))
            return false;

        this.prepareTarget(target);
        this.target = target;
        this.options = value;
    }

    validate(target:any):boolean {
        if (target.container == null || !(target instanceof SVGElement)) {
            console.log("target.container must be set to an SVGElement");
            return false;
        }
    }

    prepareTarget(target:any) {
        target.x = target.x || 0;
        target.y = target.y || 0;
        target.startAngle = target.startAngle || 0;
        target.arcDegrees = target.arcDegress || 0;
        target.thickness = target.thickness || 1;
    }

    set(ratio:number):void {
        var x = isNumeric(this.options.x) ? this.scaleValue(this.target.x, this.options.x, ratio) : this.target.x;
        var y = isNumeric(this.options.y) ? this.scaleValue(this.target.y, this.options.y, ratio) : this.target.y;
        var y = isNumeric(this.options.y) ? this.scaleValue(this.target.y, this.options.y, ratio) : this.target.y;
    }

    scaleValue(start:number, end:number, ratio:number):number {
        return start + ((end - start) * ratio);
    }
}