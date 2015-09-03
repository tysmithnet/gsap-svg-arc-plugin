///<reference path="snapsvg.d.ts"/>

class SvgArc {
    private snap:Snap;
    private arc:Snap.Element;
    private lowerMask:Snap.Element;
    private upperMask:Snap.Element;
    private maskGroup:any;

    constructor(private container:SVGElement,
                private x:number,
                private y:number,
                private startAngle:number,
                private arcDegrees:number,
                private offset:number,
                private thickness:number) {
        this.snap = Snap(container);
        this.arc = this.snap.path(this.describeArc(this.x, this.y, this.offset + this.thickness, this.startAngle, this.startAngle + this.arcDegrees));
        this.lowerMask = this.snap.path(this.describeArc(this.x, this.y, this.offset, this.startAngle, this.startAngle + this.arcDegrees));
        this.upperMask = this.snap.path(this.describeArc(this.x, this.y, this.offset + this.thickness, this.startAngle, this.startAngle + this.arcDegrees));
        this.lowerMask.attr({fill: "#000"});
        this.upperMask.attr({fill: "#fff"});
        this.maskGroup = this.snap.group(this.lowerMask, this.upperMask);
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
            "A", radius, radius, 0, arcSweep, 0, end.x, end.y,
            "L", x, y,
            "L", start.x, start.y
        ].join(" ");

        return d;
    }

}
