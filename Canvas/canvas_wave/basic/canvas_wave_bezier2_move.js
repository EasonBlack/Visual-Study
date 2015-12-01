(function(){
    //B(t) = (1-t)^2P0 + 2t(1-t)P1 + t^2P2
    //x(t) = (1-t)^2 * x1 + 2 * (1-t) * t * x2 + t^2 * x3
    //y(t) = (1-t)^2 * y1 + 2 * (1-t) * t * y2 + t^2 * y3
    var canvas = document.getElementById('canvas_wave_bezier2_move');
    var ctx = canvas.getContext('2d');
    ctx.lineJoin = 'round';
    canvas.width = 300;
    canvas.height = 300;
    var x=0,y=0;
    var position = 0.0;

    var startPt = {x: 0, y: canvas.height/2};
    var controlPt = {x: 100, y: canvas.height/2 + 100};
    var endPt = {x: canvas.width, y: canvas.height/2 - 50};

    var draw = function(){
        ctx.fillStyle = "rgba(0,222,255, 0.2)";
        ctx.strokeStyle = '#000';
        ctx.moveTo(0, canvas.height/2);
        ctx.lineTo(100, canvas.height/2 + 100);
        ctx.lineTo(canvas.width, canvas.height/2 - 50 );
        ctx.save();
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = '#00f';
        ctx.moveTo(0, canvas.height/2);
        //ctx.quadraticCurveTo(100, canvas.height/2 + 100 , canvas.width, canvas.height/2 - 50 );
        ctx.stroke();


        var drawline= function(){
            var pt = getQuadraticCurvePoint(startPt.x, startPt.y, controlPt.x, controlPt.y, endPt.x, endPt.y, position);
            position = (position + 0.001);
            ctx.lineTo(pt.x, pt.y);
            ctx.stroke();
            if(pt.x >= endPt.x) {
                return false;
            }
            setTimeout(function(){
                drawline();
            },5);
        }
        drawline();
    }
    draw();


    function _getQBezierValue(t, p1, p2, p3) {
        var iT = 1 - t;
        return iT * iT * p1 + 2 * iT * t * p2 + t * t * p3;
    }

    function getQuadraticCurvePoint(startX, startY, cpX, cpY, endX, endY, position) {
        return {
            x:  _getQBezierValue(position, startX, cpX, endX),
            y:  _getQBezierValue(position, startY, cpY, endY)
        };
    }
})();