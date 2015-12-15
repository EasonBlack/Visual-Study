var PointList = function(dataSet){
     var self = this;
     this.points = [];
     this.dataSet = dataSet;
     this.dataLen = dataSet.length;
     this.currentIndex = 0;
     this.times = {
         'fast': { totaltime: 500, time: 500},
         'normal': {totaltime: 1000, time:200},
         'slow': {totaltime:2000, time:100}
     };
     var _dataSet = dataSet[0];
     for(var i= 0,ilen=_dataSet.length;i<ilen;i++){
        self.points.push(new Point(_dataSet[i]));
     }
}

PointList.prototype.setAllValue = function() {
    var self = this;
    for (var i = 0, ilen = this.dataSet.length; i < ilen; i++) {
        var _dataSet = this.dataSet[i];
        for (var j = 0, jlen = _dataSet.length; j < jlen; j++) {
            var point = self.points[j];
            point.values.push(_dataSet[j][2]);

        }
    }
}



PointList.prototype.setSpeed = function(s){
    this.speed = s ;
    this.time = this.times[s].time;
    this.totaltime = this.times[s].totaltime;
    this.steps =  this.totaltime / this.time;
    //this.stepsLen = this.steps*this.dataLen;
}

PointList.prototype.setSpeedValue = function(){
    var self = this;
    for(var i= 0,ilen=this.points.length;i<ilen;i++){
        var point = this.points[i];
        for(var ii= 0,iilen=point.values.length;ii<iilen;ii++){
            var _val = point.values[ii];
            point.steps.push(_val);
            if(ii+1<point.values.length) {
                var _next_value = point.values[ii+1];
                var _span = _next_value - _val;
                var _step = _span / self.steps;
                if(Math.abs(Math.floor(_step))>1) {
                    _step = Math.floor(_step);
                } else {
                    _step = _step> 0 ?1:-1;
                }
                for(var j=0;j<self.steps;j++) {
                    if(_next_value>_val && _val + j*_step <= _next_value) {
                        point.steps.push(_val + j*_step);
                    } else if(_next_value < _val &&  _val + j*_step >= _next_value)  {
                        point.steps.push(_val + j*_step);
                    }
                    else {
                        point.steps.push(_next_value);
                    }
                }
            }
        }
    }
    this.stepsLen = this.points[0].steps.length;
    console.log(this.points);

}



PointList.prototype.getOneLayerValue = function(index){
    var self = this;
    for(var i= 0,ilen=this.points.length;i<ilen;i++){
        var point = this.points[i];
        point.value = point.steps[index];
    }
    return this.points;
}




var Point = function(obj) {
    this.x =  obj[0];
    this.y =  obj[1];
    this.value = null;
    this.next_value = null;
    this.values = [];
    this.steps = [];
}
