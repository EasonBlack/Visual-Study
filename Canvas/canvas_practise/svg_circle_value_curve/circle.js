class Circle  {
    constructor( options) {
        this.x = options.width/2;
        this.y = options.height/2;
        this.r = options.r;
        this.snap = options.snap;
        this.data = options.data;
        this.bones = options.data.length;
        this.ra = 360/ this.bones;
        this.points = [];
        this.pointsOnCircle= [];
        this.curveColor = this.snap.gradient("L(0, 0, 200, 200)#000-#f00:25-#fff");
    }

    drawCircle() {
        let bigCircle = this.snap.circle(this.x, this.y, this.r);
        bigCircle.attr({
            fill: "#bada55",
            stroke: "#000",
            strokeWidth: 2
        });
        let smallCircle  = this.snap.circle(this.x, this.y, 10);
        smallCircle.attr({
            fill: "#ccc"
        });
    }

    drawBones() {
        for (var i = 0; i < this.bones; i++) {
            let start = {x: this.x , y: this.y + this.r + this.data[i]};
            let startOnCircle = {x: this.x , y: this.y + this.r};
            let end = {
                x: (start.x - this.x) * Math.cos(this.ra*i* Math.PI / 180) - (start.y - this.y) * Math.sin(this.ra*i* Math.PI / 180) + this.x,
                y: (start.x - this.x) * Math.sin(this.ra*i* Math.PI / 180) + (start.y - this.y) * Math.cos(this.ra*i* Math.PI / 180) + this.y
            }
            let endOnCircle = {
                x: (start.x - this.x) * Math.cos(this.ra*i* Math.PI / 180) - (startOnCircle.y - this.y) * Math.sin(this.ra*i* Math.PI / 180) + this.x,
                y: (start.x - this.x) * Math.sin(this.ra*i* Math.PI / 180) + (startOnCircle.y - this.y) * Math.cos(this.ra*i* Math.PI / 180) + this.y
            }
            this.points.push(end);
            this.pointsOnCircle.push(endOnCircle);

            let l = this.snap.line(this.x, this.y, end.x, end.y);
            l.attr({
                stroke: "#000"
            })

        }
    }

    drawCurve(type) {
        let curvePoints = this.points.slice();
        curvePoints.push(this.points[0]);
        let curvePointsOnCircle = this.pointsOnCircle.slice();
        curvePointsOnCircle.push(this.pointsOnCircle[0]);
        for (var i = 0; i < this.points.length; i++) {
            let _curve =null;
            if(type=='quadratic'){
                _curve = this.snap.path(`M${this.x},${this.y}L${curvePoints[i].x},${curvePoints[i].y} Q${this.x},${this.y} ${curvePoints[i+1].x},${curvePoints[i+1].y}L${this.x},${this.y}`);
            } else if(type=='bezier'){
                _curve = this.snap.path(`M${this.x},${this.y}L${curvePoints[i].x},${curvePoints[i].y} C${curvePointsOnCircle[i].x},${curvePointsOnCircle[i].y} ${curvePointsOnCircle[i+1].x},${curvePointsOnCircle[i+1].y} ${curvePoints[i+1].x},${curvePoints[i+1].y} L${this.x},${this.y}`);
            }
            _curve.attr({
                fill : `R(${this.x}, ${this.y}, ${this.r + 100})#ffff00-#ff0000`
            })
        }
    }
}