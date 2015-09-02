///<reference path="snapsvg.d.ts"/>

interface IPluginOptions {
    x:number;
    y:number;
    startAngle: number;
    arcDegrees: number;
    thickness: number;
}

class SvgArc {
    private snap:Snap;
    private arc:Snap.Element;
    private lowerMask:Snap.Element;
    private upperMask:Snap.Element;

    constructor(private container:SVGElement,
                private x:number,
                private y:number,
                private startAngle:number,
                private arcDegrees:number,
                private offset:number,
                private thickness:number) {
        this.snap = Snap(container);
        this.arc = this.path(describeArc(this.x, this.y, this.offset + this.thickness, this.startAngle, this.startAngle + this.arcDegrees));
        this.lowerMask = this.path(describeArc(this.x, this.y, this.offset, this.startAngle, this.startAngle + this.arcDegrees));
        this.arc = this.path(describeArc(this.x, this.y, this.offset + this.thickness, this.startAngle, this.startAngle + this.arcDegrees));
        this.lowerMask.attr({fill: "#000"});
        this.upperMask.attr({fill: "#fff"});
    }

    polarToCartesian(centerX, centerY, radius, angleInDegrees) {
        var angleInRadians = (angleInDegrees) * Math.PI / 180.0;

        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    }

    describeArc(x, y, radius, startAngle, endAngle) {

        var start = polarToCartesian(x, y, radius, endAngle);
        var end = polarToCartesian(x, y, radius, startAngle);

        var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";

        var d = [
            "M", start.x, start.y,
            "A", radius, radius, 0, arcSweep, 0, end.x, end.y,
            "L", x, y,
            "L", start.x, start.y
        ].join(" ");

        return d;
    }

}

function isNumeric(value:any):boolean {
    return !isNaN(parseFloat(value)) && isFinite(value);
}

class SvgArcPlugin {
    propName:string = "typed";
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