class Points {
    constructor(options) {
        this.oy = options.height / 2;
        this.ox = 50;
        this.snap = options.snap;
        this.points = options.data;
        this.k = options.k;
    }

    drawPolyline() {
        let l = this.snap.polyline(this.points.map(o=>{
           return [o.x,o.y]
        }).join(','));
        l.attr({
            fill: 'none',
            stroke: 'steelblue'
        })
    }

    drawCatmullRom() {
        let last = this.points.length -1;
        let paths =[];
        paths.push(`M${this.points[0].x},${this.points[0].y}`)
        for(let i =0;i<this.points.length;i++){
            let o = {
                p0: this.points[Math.max(0, i - 1)],
                p1: this.points[i],
                p2: this.points[Math.min(last, i + 1)],
                p3: this.points[Math.min(last, i + 2)]
            }

            let cp1 = {
                x: o.p1.x + (o.p2.x - o.p0.x) / 6 * this.k,
                y: o.p1.y + (o.p2.y - o.p0.y) / 6 * this.k,
            }
            let cp2 = {
                x: o.p2.x - (o.p3.x - o.p1.x) / 6 * this.k,
                y: o.p2.y - (o.p3.y - o.p1.y) / 6 * this.k,
            }
            paths.push(`C${cp1.x},${cp1.y} ${cp2.x},${cp2.y} ${o.p2.x},${o.p2.y}`)
        }
        let _curve = this.snap.path(paths.join(' '));
        _curve.attr({
            fill: 'none',
            stroke: 'black'
        })
    }

}