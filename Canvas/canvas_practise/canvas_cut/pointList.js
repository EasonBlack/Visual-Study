class PointList {
    constructor(options, points) {
        this.points = points;
        this.ctx = options.ctx;
        this.w = options.w;
        this.h = options.h;
        this.img = options.img;
    }

    draw() {
        this.mask();
        this.surround();
        this.points.forEach(point=>{
            point.draw()
        })
    }

    mask() {
        let c = this.ctx;
        let ps = this.points;

        c.beginPath();
        c.fillStyle='rgba(0,0,0,0.3)';
        c.moveTo(ps[0].options.x, ps[0].options.y);
        c.lineTo(0, 0);
        c.lineTo(WIDTH, 0);
        c.lineTo(ps[1].options.x, ps[1].options.y);
        c.lineTo(ps[0].options.x, ps[0].options.y);

        c.moveTo(ps[1].options.x, ps[1].options.y);
        c.lineTo(WIDTH, 0);
        c.lineTo(WIDTH, HEIGHT);
        c.lineTo(ps[2].options.x, ps[2].options.y);
        c.lineTo(ps[1].options.x, ps[1].options.y);

        c.moveTo(ps[2].options.x, ps[2].options.y);
        c.lineTo(WIDTH, HEIGHT);
        c.lineTo(0, HEIGHT);
        c.lineTo(ps[3].options.x, ps[3].options.y);
        c.lineTo(ps[2].options.x, ps[2].options.y);

        c.moveTo(ps[3].options.x, ps[3].options.y);
        c.lineTo(0, HEIGHT);
        c.lineTo(0, 0);
        c.lineTo(ps[0].options.x, ps[0].options.y);
        c.lineTo(ps[3].options.x, ps[3].options.y);

        c.fill();
    }

    surround() {
        let ps = this.points.slice();
        let start = ps.shift()
        let startX = start.options.x;
        let startY = start.options.y;
        this.ctx.beginPath();
        this.ctx.strokeStyle='rgba(0,0,0,0.6)'
        this.ctx.moveTo(startX, startY);
        this.points.forEach(p=>{
            this.ctx.lineTo(p.options.x, p.options.y);
        })
        this.ctx.lineTo(startX, startY);
        this.ctx.stroke();
    }

    isInPoints(px,py) {
        let p = null
        this.points.forEach(point=>{
            let {x, y, r} = point.options;
            let _r = Math.sqrt(Math.pow(px-x, 2) + Math.pow(py-y,2))
            console.log(_r, r);
            if(_r< r){
                p = point
            }
        })
        return p;
    }
}