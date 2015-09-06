///<reference path="snapsvg.d.ts"/>

interface ISvgArcOptions
{
     x:number;
     y:number;
     startAngle:number;
     arcDegrees:number;
     offset:number;
     thickness:number;
}

class SvgArc {
    private snap:Snap;
    private arc:Snap.Element;
    private lowerMask:Snap.Element;
    private upperMask:Snap.Element;
    private maskGroup:any;

    constructor(private container:SVGElement, public options:ISvgArcOptions) {
        this.snap = Snap(this.container);
        this.arc = this.snap.path(this.describeArc(this.options.x, this.options.y, this.options.offset + this.options.thickness, this.options.startAngle, this.options.startAngle + this.options.arcDegrees));
        this.lowerMask = this.snap.path(this.describeArc(this.options.x, this.options.y, this.options.offset, this.options.startAngle, this.options.startAngle + this.options.arcDegrees));
        this.upperMask = this.snap.path(this.describeArc(this.options.x, this.options.y, this.options.offset + this.options.thickness, this.options.startAngle, this.options.startAngle + this.options.arcDegrees));
        this.arc.attr({fill: 'none', stroke: 'none'});
        this.lowerMask.attr({fill: "#000"});
        this.upperMask.attr({fill: "#fff"});
        this.maskGroup = this.snap.group(this.upperMask, this.lowerMask);
        this.arc.attr({mask: this.maskGroup});
    }

    polarToCartesian(centerX, centerY, radius, angleInDegrees) {
        var angleInRadians = (angleInDegrees) * Math.PI / 180.0;

        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    }

    describeArc(x, y, radius, startAngle, endAngle) {

        var start = this.polarToCartesian(x, y, radius, endAngle);
        var end = this.polarToCartesian(x, y, radius, startAngle);

        var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";

        var d = [
            "M", start.x, start.y,
            "A", radius, radius, 0, arcSweep, 0, end.x, end.y
        ].join(" ");

        return d;
    }

    updatePaths():void {
        this.arc.attr({d:this.describeArc(this.options.x, this.options.y, this.options.offset + this.options.thickness, this.options.startAngle, this.options.startAngle + this.options.arcDegrees)});
        this.lowerMask.attr({d:this.describeArc(this.options.x, this.options.y, this.options.offset, this.options.startAngle, this.options.startAngle + this.options.arcDegrees)});
        this.upperMask.attr({d:this.describeArc(this.options.x, this.options.y, this.options.offset + this.options.thickness, this.options.startAngle, this.options.startAngle + this.options.arcDegrees)});
    }

    cloneOptions(): ISvgArcOptions {
        return JSON.parse(JSON.stringify(this.options));
    }
}
