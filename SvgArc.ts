///<reference path="snapsvg.d.ts"/>

class SvgArc {
    private snap:Snap;
    private arc:Snap.Element;

    constructor(
        private container:SVGElement,
        private x:number,
        private y: number,
        private startAngle:number,
        private arcDegrees,
        private offset: number,
        private thickness:number,
        private elementStyles:any = {}) {
        this.element = document.createElementNS("http://www.w3.org/2000/svg", 'path');
        this.element.setAttribute("d", this.describeArc());
        this.element.style.fill = "none";
        this.element.style.stroke = "#000";
        this.element.style.strokeWidth = thickness;
        for(var prop in this.elementStyles) {
            this.element.style[prop] = this.elementStyles[prop];
        }
        this.container.appendChild(this.element);
    }

    polarToCartesian(centerX, centerY, radius, angleInDegrees) {
        var angleInRadians = (angleInDegrees) * Math.PI / 180.0;

        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    }

    describeArc() {
        var radius = this.offset + (.5 * this.thickness);
        var start = this.polarToCartesian(this.x, this.y, radius, this.startAngle + this.arcDegrees);
        var end = this.polarToCartesian(this.x, this.y, radius, this.startAngle);

        var arcSweep = this.arcDegrees <= 180 ? "0" : "1";

        var d = [
            "M", start.x, start.y,
            "A", radius, radius, 0, arcSweep, 0, end.x, end.y
        ].join(" ");

        return d;
    }

    updatePaths():void {
        this.element.setAttribute("d", this.describeArc());
        this.element.style.strokeWidth = this.thickness;
    }

    cloneOptions(): any {
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
