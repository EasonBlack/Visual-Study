class Cubes {
    constructor(o) {
        this.cubes = [];
        this.c = o.ctx;
        this.columns = o.columns;
        this.rows = o.rows;
        this.size = o.size;
        this.bombs =o.bombs;

        for(let i=0;i<this.rows;i++) {
            for(let j=0;j<this.columns;j++) {
                let num = this.bombs.checkBombs(j,i)
                let o = new Cube({ctx:this.c, x: j, y: i, num: num, size: this.size});
                this.cubes.push(o);
            }
        }
    }

    cubesDraw() {
        this.cubes.forEach(o=> {
            o.draw();
        })
    }

    draw() {
        this.bombs.draw();
        this.cubesDraw();

    }
}