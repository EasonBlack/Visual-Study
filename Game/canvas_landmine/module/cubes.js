class Cubes {
    constructor(o) {
        this.cubes = [];
        this.c = o.ctx;
        this.columns = o.columns;
        this.rows = o.rows;
        this.size = o.size;
        this.bombNum = o.bombNum;
        this.bombs = [];

        this.createBombs(this.bombNum);

        for(let i=0;i<this.rows;i++) {
            for(let j=0;j<this.columns;j++) {
                let num = this.checkBombs(j,i)
                let bomb = null;
                if(num == -1 ){
                    bomb = this.getBomb(j,i);
                }
                let o = new Cube({ctx:this.c, x: j, y: i, num: num, size: this.size, bomb: bomb});
                this.cubes.push(o);
            }
        }
    }

    checkBombs(x, y) {
        let num =0;
        for(let i =0;i<this.bombs.length;i++) {
            let o = this.bombs[i];
            if(x == o.opts.x && y==o.opts.y) {
                return -1;  // is bomb
            }
            if(Math.abs(x-o.opts.x)<=1 && Math.abs(y-o.opts.y)<=1 ) {
                num ++;
            }
        }
        return num;
    }

    getCube(cx,cy) {
        for(let i=0;i<this.cubes.length;i++) {
            let {x,y,size} = this.cubes[i].opts;
            if(cx==x && cy==y) {
                return this.cubes[i];
            }
        }
        return null;
    }

    getBomb(x,y) {
        for(let i =0;i<this.bombs.length;i++) {
            let o = this.bombs[i];
            if(x == o.opts.x && y==o.opts.y) {
                return o;
            }
        }
        return null;
    }

    checkClick(cx,cy) {
        for(let i=0;i<this.cubes.length;i++) {
            let {x,y,size} = this.cubes[i].opts;
            let xStart = x * size;
            let yStart = y * size;
            let xEnd = (x + 1) * size;
            let yEnd = (y + 1) * size;
            if(cx>xStart && cx <xEnd && cy > yStart && cy<yEnd) {
                this.cubes[i].getClick();
                this.startCombo([this.cubes[i]]);
                return {x: x, y: y};
            }
        }
        return false;
    }

    startCombo(combo) {
        for(let i=combo.length -1;i>=0;i-- ){
            let c = combo[i];
            c.getClick();
            //arguments.callee(this.getCleanAround(c.opts.x, c.opts.y));
            this.startCombo(this.getCleanAround(c.opts.x, c.opts.y));
        }
    }

    getCleanAround(x,y) {
        let a = [];
        let result = [];
        a.push(this.getCube(x-1,y-1));
        a.push(this.getCube(x-1,y));
        a.push(this.getCube(x-1,y+1));
        a.push(this.getCube(x,y-1));
        a.push(this.getCube(x,y+1));
        a.push(this.getCube(x+1,y-1));
        a.push(this.getCube(x+1,y));
        a.push(this.getCube(x+1,y+1));

        for(let i =0;i<a.length;i++){
            let o = a[i];
            if(!o) continue;
            if(o.isBomb || o.clicked || o.opts.num > 0) continue;

            result.push(o);
        }

        return result;
    }

    createBombs(bombNum) {
        let _bombs = [];
        for(let i =0 ;i<bombNum;i++) {
            let x = Math.floor(Math.random()* (this.columns-1));
            let y = Math.floor(Math.random()* (this.rows-1));
            if(!_bombs.find(o=>o.x == x && o.y ==y)) {
                _bombs.push({x, y});
            }
        }
      
        _bombs.forEach(o=> {
            let b = new Bomb({ctx: this.c, x: o.x, y:o.y});
            this.bombs.push(b);
        })
    }

    cubesDraw() {
        this.cubes.forEach(o=> {
            o.draw();
        })
    }


    draw() {
        this.bombs.forEach(b=> {
            b.draw();
        })
        this.cubesDraw();

    }
}