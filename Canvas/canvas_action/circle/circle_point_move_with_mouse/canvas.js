
import circle from './circle';

class Canvas {
    constructor(canvasId, opts) {
        this.init(canvasId);
        this.rows = opts.rows;
        this.columns = opts.columns;
        this.r = opts.r;
        this.circles = [];
        this.layoutCircle();
    }

    init(canvasId) {
        this.canvas = document.getElementById(canvasId);
        window.ctx = this.canvas.getContext('2d');
    }

    layoutCircle(){
        for(let i =0;i<this.rows;i++){
            for(let j=0 ;j<this.columns;j++) {
                let x = this.r * 2 * (j+1);
                let y = this.r * 2 * (i+1);
                this.createCircle(x,y,this.r);
            }
        }
    }

    createCircle(x,y,r) {
        let c = new circle({x,y,r});
        this.circles.push(c);
    }

    drawCircles() {
        for(let i =0;i<this.circles.length;i++) {
            let c = this.circles[i];
            c.draw(this.pointer || {x: 0, y:0});
        }
    }

    setPointer(x,y) {
        this.pointer = {x,y};
        this.draw();
    }

    draw() {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawCircles();
    }
}

export default Canvas;