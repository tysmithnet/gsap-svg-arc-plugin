///<reference path="snapsvg.d.ts"/>
var SvgArc = (function () {
    function SvgArc(container, x, y, startAngle, arcDegrees, thickness, offset) {
        this.container = container;
        this.x = x;
        this.y = y;
        this.startAngle = startAngle;
        this.arcDegrees = arcDegrees;
        this.thickness = thickness;
        this.offset = offset;
        this.snap = Snap(this.container);
        this.arc = this.snap.path(this.describeArc(this.x, this.y, this.offset + this.thickness - (.5 * this.thickness), this.startAngle, this.startAngle + this.arcDegrees));
        this.arc.attr({ fill: 'none', stroke: 'none', strokeWidth: thickness });
    }
    SvgArc.prototype.polarToCartesian = function (centerX, centerY, radius, angleInDegrees) {
        var angleInRadians = (angleInDegrees) * Math.PI / 180.0;
        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    };
    SvgArc.prototype.describeArc = function (x, y, radius, startAngle, endAngle) {
        var start = this.polarToCartesian(x, y, radius, endAngle);
        var end = this.polarToCartesian(x, y, radius, startAngle);
        var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";
        var d = [
            "M", start.x, start.y,
            "A", radius, radius, 0, arcSweep, 0, end.x, end.y
        ].join(" ");
        return d;
    };
    SvgArc.prototype.updatePaths = function () {
        this.arc.attr({
            d: this.describeArc(this.x, this.y, this.offset + this.thickness, this.startAngle, this.startAngle + this.arcDegrees),
            strokeWidth: this.thickness
        });
    };
    SvgArc.prototype.cloneOptions = function () {
        return {
            x: this.x,
            y: this.y,
            startAngle: this.startAngle,
            arcDegrees: this.arcDegrees,
            thickness: this.thickness,
            offset: this.offset
        };
    };
    return SvgArc;
})();
//# sourceMappingURL=SvgArc.js.map