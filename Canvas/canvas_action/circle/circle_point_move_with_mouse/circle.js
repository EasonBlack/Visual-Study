export default class Circle {
    constructor(opts) {
        this.x = opts.x;
        this.y = opts.y;
        this.r = opts.r;
        this.pointRadius = 6;

    }

    drawBall(pointer) {
        let flag = 1;
        if(pointer.y < this.y) flag = -1;
        let oa = this.r - this.pointRadius;
        let ob = Math.sqrt((pointer.x - this.x) ** 2 + (pointer.y - this.y) ** 2);
        let ab = Math.sqrt((pointer.x - (this.x + this.r - this.pointRadius )) ** 2 + (pointer.y - this.y) ** 2);
        let angle = Math.acos((oa ** 2 + ob ** 2 - ab ** 2) / (2 * oa * ob)) * flag;
        let x = this.x + this.r - this.pointRadius;
        let y = this.y ;
        var point = {
            x: x - this.x,
            y: y - this.y
        }
        var _x = point.x * Math.cos(angle) - point.y * Math.sin(angle) + this.x;
        var _y = point.x * Math.sin(angle) + point.y * Math.cos(angle) + this.y;

        ctx.beginPath();
        ctx.fillStyle = 'red';
        ctx.arc(_x, _y, this.pointRadius, 0, 2 * Math.PI);
        ctx.fill();
    }

    draw(pointer) {
        ctx.beginPath();
        ctx.fillStyle = 'rgba(128,165,208,0.7)';
        ctx.arc(this.x, this.y, 4, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(128,165,208,0.7)';
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.stroke();
        this.drawBall(pointer);
    }

}