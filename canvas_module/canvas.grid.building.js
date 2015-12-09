var Buildings = function(ctx,options, bs){
    this.buildings = [];
    this.c = ctx;
    this.x = options.x;
    this.y = options.y;
    this.element = options.element;
    this.ystep = options.ystep;
    this.targetBuilding;
    for(var i = 0,ilen=bs.length;i<ilen;i++){
        var _options = bs[i];
        _options.x = this.x;
        _options.y = this.y;
        _options.element = this.element;
        var _b = new Building(ctx, _options);
        this.buildings.push(_b);
        this.y += _options.h +  this.ystep;
    }
    this.mouseHandle();
}

Buildings.prototype.draw = function(){
    this.drawBuildings();
}
Buildings.prototype.drawBuildings = function(){
    for(var i = 0,ilen=this.buildings.length;i<ilen;i++){
        var _b = this.buildings[i];
        _b.draw();
    }
}

Buildings.prototype.mouseHandle = function(){
    if(!this.element) return ;

    var self = this;
    var _offset = $(this.element).offset();
    this.offsetX = _offset.left;
    this.offsetY = _offset.top;

    $(this.element).mousedown(function (e) {
        self.handleMouseDown(e);
    });
}

Buildings.prototype.handleMouseDown = function(e){
    e.preventDefault();
    this.startX = parseInt(e.clientX - this.offsetX);
    this.startY = parseInt(e.clientY - this.offsetY);
    for(var i = 0,ilen=this.buildings.length;i<ilen;i++){
        var _b = this.buildings[i];
        var _isDown = this.isDownFunction.call(_b, this.startX, this.startY);

        if(_isDown) {
            if(_b.hasStroke) {
                this.targetBuilding = null;
                _b.setHasStroke(false);
            } else {
                this.targetBuilding = _b;
                _b.setHasStroke(true);
            }
        } else {
            _b.setHasStroke(false);
        }
    }
}

Buildings.prototype.getTarget = function(){
    return this.targetBuilding;
}

Buildings.prototype.isDownFunction = function(x, y){
    var _leftx  = this.x;
    var _rightx = this.x + this.w;
    var _topy = this.y;
    var _downy = this.y + this.h
    if(x > _leftx && x < _rightx && y > _topy && y< _downy) {
        return true;
    } else {
        return false;
    }
}


var Building = function(ctx, options){
    this.c = ctx;
    this.w = options.w;
    this.h = options.h;
    this.x = options.x;
    this.y = options.y;
    this.hasStroke = null;
    this.element = options.element;
    this.fillStyle = options.fillStyle;
    this.strokeStyle = options.strokeStyle;

}

Building.prototype.draw =  function(ctx){
    this.drawBuilding(ctx);
}

Building.prototype.setHasStroke =  function(bool){
    this.hasStroke = bool;
}

Building.prototype.drawBuilding =  function(ctx){
    if(!ctx) ctx = this.c;
    ctx.beginPath();
    ctx.fillStyle= this.fillStyle;
    ctx.strokeStyle = this.strokeStyle;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    if(this.hasStroke) {
        ctx.beginPath();
        ctx.strokeStyle = 'skyblue';
        ctx.lineWidth = 3;
        ctx.rect(this.x, this.y, this.w,this.h);
        ctx.stroke();
    }
}







