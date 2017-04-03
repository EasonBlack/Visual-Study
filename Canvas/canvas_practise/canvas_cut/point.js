
class Point {
    constructor(opts) {
        this.options = opts;
        this.options.r = 10;
    }

    draw() {
        let {ctx, x, y, r } = this.options;
        ctx.beginPath();
        ctx.fillStyle='red';
        ctx.arc( x,y, r, 0 ,2 * Math.PI);
        ctx.fill();
    }

    set(x,y) {
        this.options.x = x //- this.options.r;
        this.options.y = y //- this.options.r;
    }
}