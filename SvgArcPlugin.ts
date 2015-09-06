///<reference path="snapsvg.d.ts"/>
///<reference path="SvgArc.ts"/>

function isNumeric(value:any):boolean {
    return !isNaN(parseFloat(value)) && isFinite(value);
}

class SvgArcPlugin {
    propName:string = "svgarc";
    API:number = 2;
    version:string = "1.0.0";
    target:ISvgArc;
    toValues:ISvgArcOptions;
    fromValues:ISvgArcOptions;

    init = (target:ISvgArc, value:ISvgArcOptions, tween:any):boolean => {
        if (!this.validate(target))
            return false;

        this.prepareTarget(target);
        this.target = target;
        this.toValues = value;
        this.fromValues = target.cloneOptions();
        return true;
    }

    validate = (target:any):boolean => {
        if (target.container == null || !(target.container instanceof SVGElement)) {
            console.log("target.container must be set to an SVGElement");
            return false;
        }
        return true;
    }

    prepareTarget = (target:any) => {
        target.x = target.x || 0;
        target.y = target.y || 0;
        target.startAngle = target.startAngle || 0;
        target.arcDegrees = target.arcDegrees || 0;
        target.thickness = target.thickness || 1;
    }

    set = (ratio:number):void => {
        this.target.options.x = isNumeric(this.toValues.x) ? this.scaleValue(this.fromValues.x, this.toValues.x, ratio) : this.fromValues.x;
        this.target.options.y = isNumeric(this.toValues.y) ? this.scaleValue(this.fromValues.y, this.toValues.y, ratio) : this.fromValues.y;
        this.target.options.startAngle = isNumeric(this.toValues.startAngle) ? this.scaleValue(this.fromValues.startAngle, this.toValues.startAngle, ratio) : this.fromValues.startAngle;
        this.target.options.arcDegrees = isNumeric(this.toValues.arcDegrees) ? this.scaleValue(this.fromValues.arcDegrees, this.toValues.arcDegrees, ratio) : this.fromValues.arcDegrees;
        this.target.options.thickness = isNumeric(this.toValues.thickness) ? this.scaleValue(this.fromValues.thickness, this.toValues.thickness, ratio) : this.fromValues.thickness;
        this.target.options.offset = isNumeric(this.toValues.offset) ? this.scaleValue(this.fromValues.offset, this.toValues.offset, ratio) - (this.target.options.thickness * .5) : this.fromValues.offset  - (this.target.options.thickness * .5);
        this.target.updatePaths();
    }

    scaleValue = (start:number, end:number, ratio:number):number => {
        return start + ((end - start) * ratio);
    }
}