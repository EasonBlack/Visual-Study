class Cube {
    constructor(o) {
        this.opts = o;
        this.isBomb = false;
        if(this.opts.num == -1) {
            this.isBomb = true;
        }
    }

    getClick() {
        if(this.isBomb) {
            this.opts.bomb.explode();
        }
        this.clicked = true;
    }

    drawWithMask() {
        let {ctx, x,y,num,size } = this.opts;
        ctx.beginPath();
        ctx.fillStyle = 'grey';
        ctx.rect(x*size + 1, y*size + 1, size - 2, size -2);
        ctx.fill();
    }

    drawWithoutMask() {
        let {ctx, x,y,num,size } = this.opts;
        if(num<=0) return;
        ctx.beginPath();
        ctx.fillStyle ='red';
        ctx.textAlign="center";
        ctx.textBaseline="middle";
        ctx.fillText(num,x*size+size/2 ,y*size+size/2);
    }

    draw() {
        if(this.clicked) {
            this.drawWithoutMask();
        } else {
            this.drawWithMask();
        }
    }
 }