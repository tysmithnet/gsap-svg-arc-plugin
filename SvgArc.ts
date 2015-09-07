///<reference path="snapsvg.d.ts"/>

class SvgArc {
    private snap:Snap;
    private arc:Snap.Element;

    constructor(private container:SVGElement, private x:number, private y: number, private startAngle:number, private arcDegrees, private thickness: number, private offset:number) {
        this.snap = Snap(this.container);
        this.arc = this.snap.path(this.describeArc(this.x, this.y, this.offset + this.thickness - (.5 * this.thickness), this.startAngle, this.startAngle + this.arcDegrees));
        this.arc.attr({fill: 'none', stroke: 'none', strokeWidth: thickness});
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
        this.arc.attr({
            d:this.describeArc(this.x, this.y, this.offset + this.thickness, this.startAngle, this.startAngle + this.arcDegrees),
            strokeWidth: this.thickness
        });
    }

    cloneOptions(): ISvgArcOptions {
        return {
            x: this.x,
            y: this.y,
            startAngle: this.startAngle,
            arcDegrees: this.arcDegrees,
            thickness: this.thickness,
            offset: this.offset
        }
    }
}
