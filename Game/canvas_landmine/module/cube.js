class Cube {
    constructor(o) {
        this.opts = o;
    }



    draw() {
        let {ctx, x,y,num,size } = this.opts;
        if(!num) return;
        console.log(num);
        ctx.beginPath();
        ctx.fillStyle ='red';
        ctx.textAlign="center";
        ctx.textBaseline="middle";
        ctx.fillText(num,x*size+size/2 ,y*size+size/2);
    }
 }