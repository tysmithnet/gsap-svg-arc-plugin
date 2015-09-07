var _gsScope = (typeof(module) !== "undefined" && module.exports && typeof(global) !== "undefined") ? global : this || window; //helps ensure compatibility with AMD/RequireJS and CommonJS/Node
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push( function() {
    "use strict";
function isNumeric(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}
var SvgArcPlugin = (function () {
    function SvgArcPlugin() {
        var _this = this;
        this.propName = "svgarc";
        this.API = 2;
        this.version = "1.0.0";
        this.init = function (target, value, tween) {
            if (!_this.validate(target))
                return false;
            _this.prepareTarget(target);
            _this.target = target;
            _this.toValues = value;
            if (typeof (value.startAngle) == 'string') {
                value.startAngle = eval('target.options.startAngle' + value.startAngle);
            }
            if (typeof (value.arcDegrees) == 'string') {
                value.arcDegrees = eval('target.options.arcDegrees' + value.arcDegrees);
            }
            if (typeof (value.thickness) == 'string') {
                value.thickness = eval('target.options.thickness' + value.thickness);
            }
            _this.fromValues = target.cloneOptions();
            return true;
        };
        this.validate = function (target) {
            if (target.container == null || !(target.container instanceof SVGElement)) {
                console.log("target.container must be set to an SVGElement");
                return false;
            }
            return true;
        };
        this.prepareTarget = function (target) {
            target.options.x = target.options.x || 0;
            target.options.y = target.options.y || 0;
            target.options.startAngle = target.options.startAngle || 0;
            target.options.arcDegrees = target.options.arcDegrees || 0;
            target.options.thickness = target.options.thickness || 1;
        };
        this.set = function (ratio) {
            _this.setX(ratio);
            _this.setY(ratio);
            _this.setStartAngle(ratio);
            _this.setArcDegrees(ratio);
            _this.setThickness(ratio);
            _this.setOffset(ratio);
            _this.target.updatePaths();
        };
        this.setX = function (ratio) {
            _this.target.options.x = isNumeric(_this.toValues.x) ? _this.scaleValue(_this.fromValues.x, _this.toValues.x, ratio) : _this.fromValues.x;
        };
        this.setY = function (ratio) {
            _this.target.options.y = isNumeric(_this.toValues.y) ? _this.scaleValue(_this.fromValues.y, _this.toValues.y, ratio) : _this.fromValues.y;
        };
        this.setStartAngle = function (ratio) {
            _this.target.options.startAngle = isNumeric(_this.toValues.startAngle) ? _this.scaleValue(_this.fromValues.startAngle, _this.toValues.startAngle, ratio) : _this.fromValues.startAngle;
        };
        this.setArcDegrees = function (ratio) {
            _this.target.options.arcDegrees = isNumeric(_this.toValues.arcDegrees) ? _this.scaleValue(_this.fromValues.arcDegrees, _this.toValues.arcDegrees, ratio) : _this.fromValues.arcDegrees;
        };
        this.setThickness = function (ratio) {
            _this.target.options.thickness = isNumeric(_this.toValues.thickness) ? _this.scaleValue(_this.fromValues.thickness, _this.toValues.thickness, ratio) : _this.fromValues.thickness;
        };
        this.setOffset = function (ratio) {
            _this.target.options.offset = isNumeric(_this.toValues.offset) ? _this.scaleValue(_this.fromValues.offset, _this.toValues.offset, ratio) - (_this.target.options.thickness * .5) : _this.fromValues.offset - (_this.target.options.thickness * .5);
        };
        this.scaleValue = function (start, end, ratio) {
            return start + ((end - start) * ratio);
        };
    }
    return SvgArcPlugin;
})();

    _gsScope._gsDefine.plugin(new SvgArcPlugin());

}); if (_gsScope._gsDefine) { _gsScope._gsQueue.pop()(); }