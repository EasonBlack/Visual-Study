class Bomb {
    constructor(opts) {
        this.opts = opts;
        this.clicked = false;
    }

    static setBomb(o) {
        Bomb.prototype.bombImage = o.bombImage;
        Bomb.prototype.explodeImage = o.explodeImage;
        Bomb.prototype.size = o.size;
    }

    explode() {
        this.clicked = true;
    }

    draw() {
        let {ctx, x, y } = this.opts;
        ctx.beginPath();
        if(this.clicked) {
            ctx.drawImage(this.explodeImage,
                x * this.size, y * this.size, this.size, this.size);
        } else {
            ctx.drawImage(this.bombImage,
                x * this.size, y * this.size, this.size, this.size);
        }
    }


    
}