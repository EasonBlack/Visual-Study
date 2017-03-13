
class Circle {
    constructor(ctx, options) {
        this.ctx = ctx;
        this.r = options.r;
        this.x = options.WIDTH/2;
        this.y = options.HEIGHT/2;
        this.bones = options.bones;
        this.data = options.data;
        this.triangle = options.triangle;
    }

    drawCircle() {
        this.ctx.beginPath();
        this.ctx.fillStyle = 'steelblue';
        this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        this.ctx.fill();
    }
    drawHeart() {
        this.ctx.beginPath();
        this.ctx.fillStyle = 'red';
        this.ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
        this.ctx.fill();
    }

    drawBones() {
        let x = this.ctx;
        let ra = 360 / this.bones;
        let rectWidth = 2;
        let rectHeight = this.r +10;
        let originCenterX = this.x  - rectWidth/2;
        let originCenterY = this.y ;
        for (var i = 0; i < this.bones; i++) {
             x.save();
             x.translate(this.x, this.y);
             x.rotate( ra*i * Math.PI / 180);
             x.fillRect(0-rectWidth/2, 0-rectWidth/2, rectWidth, rectHeight);
             x.restore();
        }
    }

    drawTriangle() {
        let x = this.ctx;
        let ra = 360 / this.bones;
        let o = {x:0,y:this.r + 5};
        let angle = this.triangle;
        let rangle = angle * Math.PI  / 180;
        let tanAngle = Math.tan(rangle);
        for (var i = 0; i < this.data.length; i++) {
            let v = this.data[i];
            let oleft = {x: Math.round(o.x -v*tanAngle) +0.5, y: o.y + v };
            let oright = {x: Math.round(o.x + v*tanAngle)+0.5, y: o.y  + v};
            x.save();
            x.translate(this.x, this.y);
            x.rotate( ra*i * Math.PI / 180);
            x.beginPath();
            x.lineCap = 'round';
            x.lineJoin = 'round';
            x.imageSmoothingEnabled = true;
            x.moveTo(o.x, o.y);
            x.lineTo(oleft.x, oleft.y);
            x.lineTo(oright.x, oright.y);
            x.lineTo(o.x, o.y);
            x.lineWidth  = 1;
            x.stroke();
            x.fill();
            x.closePath();
            x.restore();
        }
    }

    static loadAll() {
        console.log("Loading all tasks..");
    }
}
