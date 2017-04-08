class Bomb {
    constructor(opts) {
        this.opts = opts;
    }

    static setBomb(o) {
        Bomb.prototype.bombImage = o.bombImage;
        Bomb.prototype.explodeImage = o.explodeImage;
        Bomb.prototype.size = o.size;
    }

    draw() {
        let {ctx, x, y } = this.opts;
        ctx.beginPath();
        ctx.drawImage(this.bombImage,
            x * this.size, y * this.size, this.size, this.size);
    }

    explode() {
        let {ctx, x, y } = this.opts;
        ctx.beginPath();
        ctx.drawImage(this.explodeImage,
            x * this.size, y * this.size, this.size, this.size);
    }

    
}