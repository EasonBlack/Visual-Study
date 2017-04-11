
class Ground {
    constructor(options) {
        this.opts = options;
    }

    draw() {
        let {ctx, size, rows, columns }= this.opts;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        for(let i=0;i<rows;i++) {
            for(let j=0;j<columns;j++) {
                ctx.fillStyle = '#ccc';
                ctx.rect(j*size, i*size, size, size);
                ctx.fill();
            }
        }
        for(let i=0;i<rows;i++) {
            for (let j = 0; j < columns; j++) {
                ctx.strokeStyle = 'steelblue';
                ctx.strokeRect(j*size, i*size, size, size);
            }
        }
    }
}