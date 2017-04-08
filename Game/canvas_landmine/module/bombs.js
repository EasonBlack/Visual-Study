class Bombs {
    constructor(opts) {
        this.opts = opts;
        this.bombs = [];
    }
    
    createBombs() {
        let _bombs = [
            {x: 2, y:2},
            {x: 5, y:3}
        ]
        _bombs.forEach(o=> {
            let b = new Bomb({ctx: this.opts.ctx, x: o.x, y:o.y});
            this.bombs.push(b);
        })
    }

    checkBombs(x,y) {
        let num =0;
        this.bombs.forEach(o=> {
            if(x == o.opts.x && y==o.opts.y) {
                return;
            }
            if(Math.abs(x-o.opts.x)<=1 && Math.abs(y-o.opts.y)<=1 ) {
                num ++;
            }
        })
        return num;
    }

    draw() {
        this.bombs.forEach(b=> {
            b.draw();
        })
    }
}