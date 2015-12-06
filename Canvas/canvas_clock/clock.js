var Clock = function (ctx, options) {
    this.ctx = ctx;
    this.center = {};
    this.center.x = ctx.canvas.width / 2;
    this.center.y = ctx.canvas.height / 2;
    this.color = options.color;
    this.outRadius = options.outRadius;
    this.secondstep = 0;
}

Clock.prototype.draw = function () {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.drawCenter();
    this.drawOutCircle();
    this.drawScale();
    this.drawSecondHand();
    this.drawMinuteHand();
    this.drawHourHand();
    this.secondstep +=1;
}

Clock.prototype.drawCenter = function () {
    var x = this.ctx;
    x.fillStyle = this.color;
    x.arc(this.center.x, this.center.y, 5, 0, 2 * Math.PI);
    x.fill()
}

Clock.prototype.drawOutCircle = function () {
    var x = this.ctx;
    x.strokeStyle = this.color;
    x.beginPath();
    x.arc(this.center.x, this.center.y, this.outRadius, 0, 2 * Math.PI);
    x.stroke();
}

Clock.prototype.drawScale = function () {
    var x = this.ctx;
    x.strokeStyle = this.color;
    var originCenterX = this.center.x * 2 -30;
    var originCenterY = this.center.y ;
    var originWidth = 15;
    var originHeight = 6;
    var originX = originCenterX - originWidth /2 -this.center.x;
    var originY = originCenterY - originHeight/2 -this.center.y;
    for (var i = 0; i < 12; i++) {
        var _num = i+3 !== 12 ? (i+3)%12 : 12 ;

        x.save();
        x.translate(this.center.x, this.center.y);
        x.rotate(30*i*Math.PI / 180);
        x.fillRect(originX, originY, originWidth, originHeight);
        x.translate(100, 0 );
        x.rotate(-30*i*Math.PI / 180);
        x.textAlign = 'center';
        x.fillText(_num, 0 ,5);
        x.restore();
    }
}



Clock.prototype.drawMinuteHand = function () {
    var x = this.ctx;
    var _m = new Date().getMinutes();
    var _angle = _m * 6 - 90;
    x.save();
    x.beginPath();
    x.translate(this.center.x, this.center.y);
    x.rotate( _angle * Math.PI / 180);
    x.fillRect( 15, - 1, 60, 3);
    x.restore();
}

Clock.prototype.drawHourHand = function () {
    var x = this.ctx;
    var _h = new Date().getHours();
    var _m = new Date().getMinutes();
    var _angle = (_h%12)* 5 * 6 - 90;
    var _angle_plus = (_m / 60) * 30;
    _angle +=  _angle_plus;
    x.strokeStyle = 'skyblue';

    x.save();
    x.beginPath();
    x.translate(this.center.x, this.center.y);
    x.rotate( _angle * Math.PI / 180);
    x.fillRect( 15, - 1, 30, 4);
    x.restore();
}

Clock.prototype.drawSecondHand = function () {
    var x = this.ctx;
    x.strokeStyle = this.color;
    var _s = new Date().getSeconds()
    var _angle = _s * 6 - 90;
    x.save();
    x.beginPath();
    x.translate(this.center.x, this.center.y);
    x.rotate( _angle * Math.PI / 180);
    x.fillRect( 15, - 1, 75, 1);
    x.restore();
}