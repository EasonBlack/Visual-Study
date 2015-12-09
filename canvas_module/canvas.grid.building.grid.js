
var BuildingGrid = function(ctx, options) {
    Grid.call(this, ctx,options);
    this.targetBuilding = options.targetBuilding;
    this.targetBuildings = [];
    this.mouseHandle();
};

BuildingGrid.prototype = Object.create(Grid.prototype);
BuildingGrid.prototype.constructor = BuildingGrid;

BuildingGrid.prototype.draw = function(){
    this.drawGrid();
    this.drawBuildings();
}


BuildingGrid.prototype.isDownFunction = function(x, y){
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


BuildingGrid.prototype.setTarget = function(building){
    this.targetBuilding = building;
}

BuildingGrid.prototype.mouseHandle = function(){
    if(!this.element) return ;

    var self = this;
    var _offset = $(this.element).offset();
    this.offsetX = _offset.left;
    this.offsetY = _offset.top;

    $(this.element).mousedown(function (e) {
        self.handleMouseDown(e);
    });

    $(this.element).mousemove(function (e) {
        self.handleMouseMove(e);
    });

    $(this.element).mouseup(function (e) {
        self.handleMouseUp(e);
    });

    $(this.element).mouseout(function (e) {
        self.handleMouseOut(e);
    });

}



BuildingGrid.prototype.handleMouseDown =  function(e) {
    e.preventDefault();
    this.downX = parseInt(e.clientX - this.offsetX);
    this.downY = parseInt(e.clientY - this.offsetY);
    if( this.targetBuilding) {
        var cloneBuilding = $.extend({}, this.targetBuilding, true);
        cloneBuilding.x = this.downX;
        cloneBuilding.y = this.downY;
        cloneBuilding.hasStroke = false;
        this.targetBuildings.push(cloneBuilding);
    } else {
        this.moveBuilding = null;
        for(var i = 0,ilen=this.targetBuildings.length;i<ilen;i++){
            var _b = this.targetBuildings[i];
            var _isDown = this.isDownFunction.call(_b, this.downX, this.downY);

            if(_isDown) {
                this.moveBuilding = _b;
                break;
            }
        }

    }
}

BuildingGrid.prototype.handleMouseMove = function(e){
    e.preventDefault();
    if (!this.moveBuilding) {
        return;
    }

    var mouseX = parseInt(e.clientX - this.offsetX);
    var mouseY = parseInt(e.clientY - this.offsetY);
    var dx = mouseX - this.downX;
    var dy = mouseY - this.downY;
    this.downX = mouseX;
    this.downY = mouseY;
    var _b =  this.moveBuilding;
    for(var j= 0,jlen=this.boxes.length;j<jlen;j++){
        if(this.boxes[j].x == _b.x && this.boxes[j].y == _b.y) continue;
        var isInOthers = this.isDownFunction.call(this.boxes[j], this.downX, this.downY);
        if(isInOthers) {
            _b.x = this.boxes[j].x;
            _b.y = this.boxes[j].y;
            break;
        }
    }

}

BuildingGrid.prototype.handleMouseUp = function(e){
    e.preventDefault();
    this.moveBuilding = null;
}

BuildingGrid.prototype.handleMouseOut = function(e){
    e.preventDefault();
    this.moveBuilding = null;
}

BuildingGrid.prototype.drawBuildings = function(e) {
    for(var i = 0,ilen=this.targetBuildings.length;i<ilen;i++){
        this.targetBuildings[i].draw(this.c);
    }
}