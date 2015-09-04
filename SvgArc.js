///<reference path="snapsvg.d.ts"/>
var SvgArc = (function () {
    function SvgArc(container, options) {
        this.container = container;
        this.options = options;
        this.snap = Snap(this.container);
        this.arc = this.snap.path(this.describeArc(this.options.x, this.options.y, this.options.offset + this.options.thickness, this.options.startAngle, this.options.startAngle + this.options.arcDegrees));
        this.lowerMask = this.snap.path(this.describeArc(this.options.x, this.options.y, this.options.offset, this.options.startAngle, this.options.startAngle + this.options.arcDegrees));
        this.upperMask = this.snap.path(this.describeArc(this.options.x, this.options.y, this.options.offset + this.options.thickness, this.options.startAngle, this.options.startAngle + this.options.arcDegrees));
        this.arc.attr({ fill: '#bada55' });
        this.lowerMask.attr({ fill: "#000" });
        this.upperMask.attr({ fill: "#fff" });
        this.maskGroup = this.snap.group(this.upperMask, this.lowerMask);
        this.arc.attr({ mask: this.maskGroup });
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
            "A", radius, radius, 0, arcSweep, 0, end.x, end.y,
            "L", x, y,
            "L", start.x, start.y
        ].join(" ");
        return d;
    };
    SvgArc.prototype.updatePaths = function () {
        this.arc.attr({ d: this.describeArc(this.options.x, this.options.y, this.options.offset + this.options.thickness, this.options.startAngle, this.options.startAngle + this.options.arcDegrees) });
        this.lowerMask.attr({ d: this.describeArc(this.options.x, this.options.y, this.options.offset, this.options.startAngle, this.options.startAngle + this.options.arcDegrees) });
        this.upperMask.attr({ d: this.describeArc(this.options.x, this.options.y, this.options.offset + this.options.thickness, this.options.startAngle, this.options.startAngle + this.options.arcDegrees) });
    };
    SvgArc.prototype.cloneOptions = function () {
        return JSON.parse(JSON.stringify(this.options));
    };
    return SvgArc;
})();
//# sourceMappingURL=SvgArc.js.map