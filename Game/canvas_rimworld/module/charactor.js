class Charactor {
    constructor(opts) {
        this.opts = Object.assign({}, opts);
        this.body = {w: 31, h: 32}
        this.stage = {f: 0, l: 1, r: 2, b: 3};
        this.timestep = 0;
        this.actionstep = 0;
        this.action = [];
    }

    set(t) {
        this.action = [
            {x: 0, y: this.stage[t] * this.body.h},
            {x: this.body.w, y: this.stage[t] * this.body.h},
            {x: this.body.w * 2, y: this.stage[t] * this.body.h},
        ]
    }

    position(x, y) {
        this.opts.x = this.opts.x + x * this.body.w ;
        this.opts.y = this.opts.y + y * this.body.h ;
    }

    actionToggle(time) {
        let len = this.action.length;
        this.timestep++;
        if (this.timestep >= time) {
            this.timestep = 0;
            this.actionstep++;
        }
        if (this.actionstep >= len) {
            this.actionstep = 0;
        }
        return this.action[this.actionstep];
    }

    draw(type) {
        let {ctx, image} = this.opts;
        let {w,h } = this.body;
        let {x,y} = this.actionToggle(15);
        ctx.drawImage(image,
            x, y, w, h,
            this.opts.x, this.opts.y, w, h);
    }
}