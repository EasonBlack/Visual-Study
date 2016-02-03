var ControlCanvas = function() {

}

ControlCanvas.prototype.init = function() {
    var control_canvas = document.getElementById('control_canvas');
    var ctx_control = control_canvas.getContext('2d');
    var sectorWidth = 40;
    ctx_control.clearRect(0, 0, control_canvas.width, control_canvas.height);
    ctx_control.save();
    ctx_control.beginPath();
    ctx_control.translate( control_canvas.width/2, control_canvas.height);
    ctx_control.moveTo(0, 0);
    ctx_control.arc(0, 0, sectorWidth*3, Math.PI * 1.5, Math.PI*2);
    ctx_control.closePath();
    ctx_control.fillStyle='#CD2E27';
    ctx_control.fill();

    ctx_control.beginPath();
    ctx_control.moveTo(0, 0);
    ctx_control.arc(0, 0, sectorWidth*2, Math.PI * 1.5, Math.PI*2);
    ctx_control.closePath();
    ctx_control.fillStyle='#EC7b75';
    ctx_control.fill();

    ctx_control.beginPath();
    ctx_control.moveTo(0, 0);
    ctx_control.arc(0, 0, sectorWidth, Math.PI * 1.5, Math.PI*2);
    ctx_control.closePath();
    ctx_control.fillStyle='#F9c2BF';
    ctx_control.fill();

    ctx_control.font = '18px Verdana';
    ctx_control.fillStyle = "#000000";
    ctx_control.textAlign = 'right';
    ctx_control.textBaseline = 'bottom';
    ctx_control.fillText('weak',-10,- 10);
    ctx_control.fillText('normal',-10,-sectorWidth *1 - 10);
    ctx_control.fillText('strong',-10,-sectorWidth *2  - 10);

    $("#control_canvas").mousedown(function (e) {
        handleMouseDown(e);
    });

    function handleMouseDown(e){
        e.preventDefault();
        var canvasOffset = $("#control_canvas").offset();
        var offsetX = canvasOffset.left;
        var offsetY = canvasOffset.top;
        startX = parseInt(e.clientX - offsetX);
        startY = parseInt(e.clientY - offsetY);
        // Put your mousedown stuff here
        var dx = startX - circle1.x;
        var dy = startY - circle1.y;

        isDown = (dx * dx + dy * dy < circle1.r * circle1.r);

        var $tips = $('#tips');
        if(isDown){
            $tips.css({left: startX + 18, top:startY - 44 });
            $tips.show();
        } else {
            $tips.hide();
        }
    }

}

