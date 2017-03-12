
class Circle {
    constructor(ctx, options) {
        this.ctx = ctx;
        this.r = options.r;
        this.x = options.WIDTH/2;
        this.y = options.HEIGHT/2;
        this.bones = options.data.length;
        this.data = options.data;
        this.triangle = options.triangle;
        this.points = [];
        this.pointsOnCircle = [];

        this.colorGradient = this.ctx.createLinearGradient (0, 0, 50, 200);
        this.colorGradient.addColorStop(0, 'rgba(255, 0, 0, 1)');
        this.colorGradient.addColorStop(1, 'rgba(255, 255, 0, 1)');
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
        let center = {x: this.x, y: this.y};
        for (var i = 0; i < this.bones; i++) {
            let startP = {x: this.x, y: this.y + this.r + this.data[i]}
            let endP = {
                x: (startP.x - center.x) * Math.cos(ra*i* Math.PI / 180) - (startP.y - center.y) * Math.sin(ra*i* Math.PI / 180) + this.x,
                y: (startP.x - center.x) * Math.sin(ra*i* Math.PI / 180) + (startP.y - center.y) * Math.cos(ra*i* Math.PI / 180) + this.y
            }
            let startPOnCircle = {x: this.x, y: this.y + this.r};
            let endPOnCircle = {
                x: (startPOnCircle.x - center.x) * Math.cos(ra*i* Math.PI / 180) - (startPOnCircle.y - center.y) * Math.sin(ra*i* Math.PI / 180) + this.x,
                y: (startPOnCircle.x - center.x) * Math.sin(ra*i* Math.PI / 180) + (startPOnCircle.y - center.y) * Math.cos(ra*i* Math.PI / 180) + this.y
            }
            this.points.push(endP);
            this.pointsOnCircle.push(endPOnCircle);

            x.save();
            x.translate(this.x, this.y);
            x.rotate( ra * i * Math.PI / 180);
            x.fillStyle = 'red';
            x.fillRect(0-rectWidth/2, 0-rectWidth/2, rectWidth, this.r + this.data[i]);
            x.restore();
            x.beginPath();
            x.fillStyle =  this.colorGradient;
            x.arc(endP.x, endP.y, 10, 0, 2 * Math.PI);
            x.fill();
        }
    }

    drawCurve(type) {
        let x = this.ctx;
        let center = {x: this.x, y: this.y};
        let _points = this.points.slice();
        _points.push(this.points[0]);
        let startP = this.points[0];
        let _pointsOnCircle = this.pointsOnCircle.slice();
        _pointsOnCircle.push(this.pointsOnCircle[0]);
        x.beginPath();
        x.lineWidth  = 1;
        x.moveTo(center.x, center.y);
        x.lineTo(startP.x, startP.y);
        for(let i =1;i<_points.length;i++) {
            let endP = _points[i];
            x.lineCap = 'round';
            x.lineJoin = 'round';
            x.imageSmoothingEnabled = true;
            if(type =='quadratic') {
                x.quadraticCurveTo(center.x,center.y,endP.x,endP.y);
            } else if(type=='bezier') {
                x.bezierCurveTo(_pointsOnCircle[i-1].x,_pointsOnCircle[i-1].y,_pointsOnCircle[i].x,_pointsOnCircle[i].y,endP.x,endP.y)
            }
        }
        x.stroke();
        x.fill();
        x.closePath();
    }

    drawSubtitle() {
        let x = this.ctx;
        let ra = 360 / this.bones;
        for (var i = 0; i < this.bones; i++) {
            x.save();
            x.translate(this.x, this.y);
            x.rotate( ra * i * Math.PI / 180);
            x.translate(0, 90);
            x.rotate(-ra *i*Math.PI / 180);
            x.textAlign = 'center';
            x.fillStyle='black';
            x.fillText(i+1, 0 ,5);
            x.restore();
        }
    }

    static loadAll() {
        console.log("Loading all tasks..");
    }
}
