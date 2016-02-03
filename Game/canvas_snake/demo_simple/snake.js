var Snake = function (ctx, options, grid) {
    this.c = ctx;
    this.options = options;
    this.boxes = [];
    this.grid = grid;
    this.stopBoxes = [];
    this.initSnake('l');
}

Snake.prototype.draw = function () {
    this.setSnakeBox();
    this.eatBox();
    this.drawSnake();
}


Snake.prototype.initSnake = function (d) {
    this.direction = d || 'l'; //this.options.direction;  // u,d,l,r
    this.startX = this.options.x;
    this.startY = this.options.y;
    this.len = this.options.len;

    for (var i = 0; i < this.len; i++) {
        this.boxes.push({
            x: this.startX + grid.w * i,
            y: this.startY,
            w: grid.w,
            h: grid.w,
            fillStyle: this.options.fillStyle,
            d: this.direction
        });
    }
}

Snake.prototype.eatBox = function () {
    var obstacles = this.grid.obstacles;
    var snakeBoxes = this.boxes;
    var startBoxed = this.boxes[0];
    for(var i= 0,ilen=obstacles.length;i<ilen;i++){
        var _o = obstacles[i];
        if(startBoxed.x == _o.x && startBoxed.y == _o.y ) {
            _o.d = startBoxed.d;
            _o = this.setXYByDirection(_o);
            this.boxes.unshift(_o);
            obstacles.splice(i,1);
            break;
        }
    }
}

Snake.prototype.setSnakeBox = function (d) {
    var currentDirection = this.direction;
    for (var i = 0, len = this.boxes.length; i < len; i++) {
        var box = this.boxes[i];
        var _theStop = null;
        var stopIndex = 0;
        for(stopIndex= 0,jlen=this.stopBoxes.length;stopIndex<jlen;stopIndex++){
            var b = this.stopBoxes[stopIndex];
            if(b.x == box.x && b.y ==box.y){
                _theStop = b;
                break;
            }
        }

        if(_theStop) {
            box.d = _theStop.d;
            if(i==len-1){
                this.stopBoxes[stopIndex] = null;
            }
        }

        box = this.setXYByDirection(box);
    }
    this.stopBoxes = _.compact(this.stopBoxes);
}

Snake.prototype.getStart = function () {
    return this.boxes[0];
};

Snake.prototype.setXYByDirection = function (box) {
    switch(box.d) {
        case 'l':
            box.x = box.x - this.grid.w;
            box.y = box.y;
            break;
        case 'r':
            box.x = box.x + this.grid.w;
            box.y = box.y;
            break;
        case 'u':
            box.x = box.x;
            box.y = box.y -  this.grid.w ;
            break;
        case 'd':
            box.x = box.x;
            box.y = box.y + this.grid.w;
            break;
    }
    return box;
};

Snake.prototype.drawSnake = function () {
    for (var i = 0, len = this.boxes.length; i < len; i++) {
        var box = this.boxes[i];
        this.c.beginPath();
        this.c.fillStyle = box.fillStyle;
        this.c.fillRect(box.x, box.y, box.w, box.h);
        this.c.stroke();
    }
    //this.startX -= grid.w;
}