
class Smoke {
    constructor(options) {
        this.count = options.count;
        this.ctx= options.ctx;
        this.particles =  [];
        for(let i =0;i<this.count;i++) {
            this.particles.push(
                new Particle(options)
            );
        }
    }

    draw() {
        this.particles.forEach((p)=> {
            p.draw();
            p.update();
        })
    }

}