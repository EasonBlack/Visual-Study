import Canvas from './canvas';
import $ from 'jquery';

(function(){
    let canvas = new Canvas('canvas', {rows: 3, columns:3, r: 30});
    canvas.draw();

    let canvasOffset = $("#canvas").offset();
    let offsetX = canvasOffset.left;
    let offsetY = canvasOffset.top;
    $('#canvas').mousemove((e)=>{
        e.preventDefault();
        let x = parseInt(e.clientX - offsetX);
        let y = parseInt(e.clientY - offsetY);
        
        canvas.setPointer(x,y);
    })

})()