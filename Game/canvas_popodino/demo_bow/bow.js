var Bow = function (ctx, options) {
    this.long = options.long;
    this.radius = options.radius;
    this.width = ctx.canvas.width;
    this.height = ctx.canvas.height;
    this.x = this.width / 2;
    this.y = this.height;
    this.a = 0;
    this.c = ctx;
    this.keys = [];
    this.bubbles = [];

}

Bow.prototype.init = function () {
    this.setBubble();
}

Bow.prototype.draw = function () {
    this.clear();
    this.setMove();
    this.drawOrigin();
    this.drawArrow();
    this.drawBubble();

}

Bow.prototype.clear = function () {
    this.c.clearRect(0, 0, this.width, this.height);
}

Bow.prototype.drawOrigin = function () {
    this.c.fillStyle = '#CC3333'
    this.c.beginPath();
    this.c.arc(this.width / 2, this.height, this.radius, 0, 2 * Math.PI);
    this.c.fill();
}

Bow.prototype.drawArrow = function () {
    this.c.save();
    this.c.beginPath();
    this.c.strokeStyle = 'black';

    this.c.translate(this.x, this.y);
    this.c.rotate(this.a * Math.PI / 180);


    this.c.moveTo(0, 0);
    this.c.lineTo(0, -this.long);
    this.c.moveTo(-2, -this.long + 2);
    this.c.lineTo(0, -this.long);
    this.c.moveTo(2, -this.long + 2);
    this.c.lineTo(0, -this.long);
    this.c.stroke();
    this.c.restore();
}

Bow.prototype.drawBubble = function () {
    for (var i = this.bubbles.length - 1; i >= 0; i--) {
        var _b = this.bubbles[i];
        var _next_x = 0, _next_y = 0;

        _b.x = _b.x + Math.sin((_b.a) * Math.PI / 180) * _b.speed;
        _b.y = _b.y - Math.cos((_b.a) * Math.PI / 180) * _b.speed;

        this.c.beginPath();
        this.c.fillStyle = _b.color;
        this.c.arc(_b.x, _b.y, _b.r, 0, 2 * Math.PI);
        this.c.fill();

        var _next =  {
            x : _b.x + Math.sin((_b.a) * Math.PI / 180) * _b.speed,
            y : _b.y - Math.cos((_b.a) * Math.PI / 180) * _b.speed,
            r: _b.r
        }
        if (this.isTouch(_next) || _next.y <= _b.r / 2) {
            _b.speed = 0;
        }
    }
}

Bow.prototype.isTouch = function (d) {
    for (var i = this.bubbles.length - 1; i >= 0; i--) {
        var _b = this.bubbles[i];
        if (!_b.speed) {
            if(this.collides(d, _b)){
                return true;
            }
        }
    }
    return false;
}

Bow.prototype.collides = function (a, b) {
    var distX = a.x - b.x;
    var distY = a.y - b.y;
    return (distX * distX) + (distY * distY) < (a.r + b.r) * (a.r + b.r);
}

Bow.prototype.setMove = function () {
    if (this.keys[39]) {  //right
        this.a = this.a + 2;
    }
    if (this.keys[37]) {   //left
        this.a = this.a - 2;
    }
}

Bow.prototype.createBubble = function (a) {
    var _color = ['#336633', '#990033', '#003399', '#CCCC00'][parseInt(Math.random() * 4)];
    var _bubble = {
        x: this.x,
        y: this.y,
        r: 5,
        a: a,
        speed: 2,
        color: _color
    };
    this.bubbles.push(_bubble);
}

Bow.prototype.setBubble = function () {
    var self = this;
    $('canvas').on('shoot', function () {
        self.createBubble(self.a);
    });
}