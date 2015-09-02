
var _gsScope = (typeof(module) !== "undefined" && module.exports && typeof(global) !== "undefined") ? global : this || window; //helps ensure compatibility with AMD/RequireJS and CommonJS/Node
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push( function() {
    //ignore the line above this and at the very end - those are for ensuring things load in the proper order
    "use strict";

    var SvgArcPlugin = (function () {
        function SvgArcPlugin() {
            this.propName = "typed";
            this.API = 2;
            this.version = "1.0.2";
        }
        SvgArcPlugin.prototype.init = function (target, value, tween) {
            if (!this.validate(target))
                return false;
            this.prepareTarget(target);
            this.target = target;
            this.options = value;
        };
        SvgArcPlugin.prototype.validate = function (target) {
            if (target.container == null || !(target instanceof SVGElement)) {
                console.log("target.container must be set to an SVGElement");
                return false;
            }
        };
        SvgArcPlugin.prototype.prepareTarget = function (target) {
            target.x = target.x || 0;
            target.y = target.y || 0;
            target.startAngle = target.startAngle || 0;
            target.arcDegrees = target.arcDegress || 0;
            target.thickness = target.thickness || 1;
        };
        SvgArcPlugin.prototype.set = function (ratio) {
            var x = isNumeric(this.options.x) ? this.scaleValue(this.target.x, this.options.x, ratio) : this.target.x;
            var y = isNumeric(this.options.y) ? this.scaleValue(this.target.y, this.options.y, ratio) : this.target.y;
            var y = isNumeric(this.options.y) ? this.scaleValue(this.target.y, this.options.y, ratio) : this.target.y;
        };
        SvgArcPlugin.prototype.scaleValue = function (start, end, ratio) {
            return start + ((end - start) * ratio);
        };
        return SvgArcPlugin;
    })();

    _gsScope._gsDefine.plugin(new SvgArcPlugin());

}); if (_gsScope._gsDefine) { _gsScope._gsQueue.pop()(); }