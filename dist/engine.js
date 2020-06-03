export default class Engine {
    constructor(update, frameRate) {
        this.accumulatedTime = 0;
        this.updated = false;
        this.handleRun = (timeStep) => {
            this.run(timeStep);
        };
        /**
         * @param update the update function what is called every frame
         * @param frameRate the frame rate the engine calls the update function
         */
        this.update = update;
        this.timeStep = frameRate;
    }
    run(timeStamp) {
        this.AFR = window.requestAnimationFrame(this.handleRun);
        this.accumulatedTime += timeStamp - this.time;
        this.time = timeStamp;
        if (this.accumulatedTime >= this.timeStep * 3) {
            this.accumulatedTime = this.timeStep;
        }
        while (this.accumulatedTime >= this.timeStep) {
            this.accumulatedTime -= this.timeStep;
            this.updated = true;
        }
        if (this.updated) {
            this.updated = false;
            this.update();
        }
    }
    start() {
        this.accumulatedTime = this.timeStep;
        this.time = window.performance.now();
        this.AFR = window.requestAnimationFrame(this.handleRun);
    }
    stop() {
        window.cancelAnimationFrame(this.AFR);
    }
}
