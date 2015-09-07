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
        if(typeof(value.startAngle) == 'string')
        {
            value.startAngle = eval('target.options.startAngle' + value.startAngle);
        }
        if(typeof(value.arcDegrees) == 'string')
        {
            value.arcDegrees = eval('target.options.arcDegrees' + value.arcDegrees);
        }
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
        target.options.x = target.options.x || 0;
        target.options.y = target.options.y || 0;
        target.options.startAngle = target.options.startAngle || 0;
        target.options.arcDegrees = target.options.arcDegrees || 0;
        target.options.thickness = target.options.thickness || 1;
    }

    set = (ratio:number):void => {
        this.setX(ratio);
        this.setY(ratio);
        this.setStartAngle(ratio);
        this.setArcDegrees(ratio);
        this.setThickness(ratio);
        this.setOffset(ratio);
        this.target.updatePaths();
    }

    setX = (ratio:number):void => {
        this.target.options.x = isNumeric(this.toValues.x) ? this.scaleValue(this.fromValues.x, this.toValues.x, ratio) : this.fromValues.x;
    }

    setY = (ratio:number):void => {
        this.target.options.y = isNumeric(this.toValues.y) ? this.scaleValue(this.fromValues.y, this.toValues.y, ratio) : this.fromValues.y;
    }

    setStartAngle = (ratio:number):void => {
        this.target.options.startAngle = isNumeric(this.toValues.startAngle) ? this.scaleValue(this.fromValues.startAngle, this.toValues.startAngle, ratio) : this.fromValues.startAngle;
    }

    setArcDegrees = (ratio:number):void => {
        this.target.options.arcDegrees = isNumeric(this.toValues.arcDegrees) ? this.scaleValue(this.fromValues.arcDegrees, this.toValues.arcDegrees, ratio) : this.fromValues.arcDegrees;
    }

    setThickness = (ratio:number):void => {
        this.target.options.thickness = isNumeric(this.toValues.thickness) ? this.scaleValue(this.fromValues.thickness, this.toValues.thickness, ratio) : this.fromValues.thickness;
    }

    setOffset = (ratio:number):void => {
        this.target.options.offset = isNumeric(this.toValues.offset) ? this.scaleValue(this.fromValues.offset, this.toValues.offset, ratio) - (this.target.options.thickness * .5) : this.fromValues.offset  - (this.target.options.thickness * .5);
    }

    scaleValue = (start:number, end:number, ratio:number):number => {
        return start + ((end - start) * ratio);
    }
}