
class Particle {
    constructor(options) {
        this.options = options;
        this.ctx = options.ctx;
        this.image = options.image
        this.reset(options);
    }

    draw() {
        this.ctx.globalAlpha = this.opacity;
        this.ctx.drawImage(this.image, 0, 0, this.size, this.size, this.x, this.y, this.size, this.size)
    }

    reset() {
        this.x = this.options.x;
        this.y = this.options.y;
        this.size = this.options.size;
        this.speedX = Math.random() * this.options.speedx;
        this.speedY = Math.random() * this.options.speedy;
        this.opacity = Math.random();
    }

    update() {
        if(this.opacity > 0) {
            this.opacity -= (Math.random() / 150);
        }
        if(this.opacity <= 0){
            this.reset();
        }
        this.speedX -= Math.random() / 200;
        this.speedY -= Math.random() / 200;
        this.x += this.speedX;
        this.y += this.speedY;
        this.size += Math.random();
        this.draw();
    }
}