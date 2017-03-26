

class Ground  {
    constructor(opts) {
        this.opts = Object.assign({}, opts);
    }


    draw() {
        let {ctx, size, image, showgrid,rows, columns }= this.opts;

        for(let i=0;i<rows;i++) {
            for(let j=0;j<columns;j++) {
                ctx.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight, j*size, i*size, size, size);
            }
        }
        if(showgrid) {
            this.drawGrid();
        }
    }

    drawGrid() {
        let {ctx, size,rows,columns }= this.opts;
        for(let i=0;i<rows;i++) {
            for(let j=0;j<columns;j++) {
                ctx.beginPath();
                ctx.strokeStyle = 'steelblue';
                ctx.strokeRect(j*size, i*size, size, size);
            }
        }
    }
}