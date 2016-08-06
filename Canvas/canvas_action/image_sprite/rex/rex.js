class Dragon {
    constructor(obj) {
        this.ctx = obj.ctx;
        this.image = obj.image;
        this.position = obj.position;

        this.step = 0;
        this.stepEnd = 0;
        this.toggle = 0;
        this.state = {};
    }

    setType(type) {
        switch (type) {
            case "BLINK":
                return this.actionToggle(this.normalStage(), this.normalCloseEyeStage(), 15)
            case "RUN":
                return this.actionToggle(this.runStartStage(), this.runEndStage(), 3)
            case "DULL":
                return this.actionToggle(this.normalStage(), this.dullStage(), 15)
            case "DIVE":
                return this.actionToggle(this.diveStartStage(), this.diveEndStage(), 15)
            default:
                return this.normalStage()
        }
    }


    normalStage() {
        return {
            start: 1680,
            w: 85,
            h: 90
        }
    }

    normalCloseEyeStage() {
        return {
            start: 1768,
            w: 85,
            h: 90
        }
    }

    dullStage() {
        return {
            start: 2031,
            w: 85,
            h: 90
        }
    }

    runStartStage() {
        return {
            start: 1856,
            w: 85,
            h: 90
        }
    }

    runEndStage() {
        return {
            start: 1944,
            w: 85,
            h: 90
        }
    }

    diveStartStage() {
        return {
            start: 2205,
            w: 110,
            h: 90
        }
    }

    diveEndStage() {
        return {
            start: 2323,
            w: 110,
            h: 90
        }
    }

    actionToggle(stage1, stage2, stepend) {
        this.step++;

        if (!this.state) this.state = stage1;
        if (this.step >= stepend) {
            this.step = 0;
            this.toggle = !this.toggle;
            this.state = this.toggle ? stage1 : stage2;
        }
        return this.state;
    }


    draw(stage) {
        let {start, w, h} = stage;
        this.ctx.drawImage(this.image,
            start, 0, w, h,
            this.position.x, this.position.y, w * 0.5, h * 0.5);
    }

}
