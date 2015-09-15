var _gsScope = (typeof(module) !== "undefined" && module.exports && typeof(global) !== "undefined") ? global : this || window; //helps ensure compatibility with AMD/RequireJS and CommonJS/Node
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push( function() {
    //ignore the line above this and at the very end - those are for ensuring things load in the proper order
    "use strict";


    function interpret(realVal, formula){
        var val = formula.match(/\d+\.?\d*/)[0];
        val = parseFloat(val);
        switch(formula[0])
        {
            case '+':
                return realVal + val;
            case '-':
                return realVal - val;
            case '*':
                return realVal * val;
            case '/':
                return realVal / val;
            case '%':
                return realVal % val;
        }
    }

    function massageValues(target, values){
        if(typeof(values.x) == 'string')
            values.x = interpret(target.x, values.x);
        
        if(typeof(values.y) == 'string')
            values.y = interpret(target.y, values.y);

        if(typeof(values.startAngle) == 'string')
            values.startAngle = interpret(target.startAngle, values.startAngle);

        if(typeof(values.arcDegrees) == 'string')
            values.arcDegrees = interpret(target.arcDegrees, values.arcDegrees);

        if(typeof(values.offset) == 'string')
            values.offset = interpret(target.offset, values.offset);

        if(typeof(values.thickness) == 'string')
            values.thickness = interpret(target.thickness, values.thickness);
    }

    _gsScope._gsDefine.plugin({
        propName: "svgarc",
        priority: 0,
        API: 2,
        version: "1.0.0",
        overwriteProps: ['x', 'y', 'startAngle', 'arcDegrees', 'thickness', 'offset'],

        init: function(target, values, tween) {
            this.target = target;

            this.toValues = JSON.parse(JSON.stringify(values));
            massageValues(target, this.toValues);
            this.fromValues = target.cloneOptions();

            this._addTween(target, 'x', this.fromValues.x, this.toValues.x, 'x', false);
            this._addTween(target, 'y', this.fromValues.y, this.toValues.y, 'y', false);
            this._addTween(target, 'startAngle', this.fromValues.startAngle, this.toValues.startAngle, 'startAngle', false);
            this._addTween(target, 'arcDegrees', this.fromValues.arcDegrees, this.toValues.arcDegrees, 'arcDegrees', false);
            this._addTween(target, 'thickness', this.fromValues.thickness, this.toValues.thickness, 'thickness', false);
            this._addTween(target, 'offset', this.fromValues.offset, this.toValues.offset, 'offset', false);

            var props = ['x', 'y', 'startAngle', 'arcDegrees', 'thickness', 'offset'];
            this.elementVals = {};
            for(var prop in values)
                if(props.indexOf(prop) == -1){
                    this.elementVals[prop] = window.getComputedStyle(this.element)[prop];
                }

            return true;
        },

        set: function(ratio) {
            this._super.setRatio.call(this, ratio);
            this.target.updatePaths();
            for(var prop in this.elementVals) {
                this.element.style[prop] = this.elementVals[prop] + (this.toValues[prop] - this.elementVals[prop]) * ratio;
            }
        }
    });

}); if (_gsScope._gsDefine) { _gsScope._gsQueue.pop()(); }