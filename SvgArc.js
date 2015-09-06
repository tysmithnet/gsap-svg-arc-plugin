///<reference path="snapsvg.d.ts"/>
var SvgArc = (function () {
    function SvgArc(container, options) {
        this.container = container;
        this.options = options;
        this.snap = Snap(this.container);
        this.arc = this.snap.path(this.describeArc(this.options.x, this.options.y, this.options.offset + this.options.thickness - (.5 * this.options.thickness), this.options.startAngle, this.options.startAngle + this.options.arcDegrees));
        this.arc.attr({ fill: 'none', stroke: 'none', strokeWidth: options.thickness });
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
            d: this.describeArc(this.options.x, this.options.y, this.options.offset + this.options.thickness, this.options.startAngle, this.options.startAngle + this.options.arcDegrees),
            strokeWidth: this.options.thickness
        });
    };
    SvgArc.prototype.cloneOptions = function () {
        return JSON.parse(JSON.stringify(this.options));
    };
    return SvgArc;
})();
//# sourceMappingURL=SvgArc.js.map