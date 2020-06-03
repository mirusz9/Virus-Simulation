// Pothonprogramming's fixed timestep engine

export default class Engine {
	private accumulatedTime = 0;
	private AFR: number; // Animation frame request
	private time: number;
	private timeStep: number;
	private updated = false;
	private update: () => void;

	constructor(update: () => void, frameRate: number) {
		/**
		 * @param update the update function what is called every frame
		 * @param frameRate the frame rate the engine calls the update function
		 */
		this.update = update;
		this.timeStep = frameRate;
	}

	run(timeStamp: number) {
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

	handleRun = (timeStep: number) => {
		this.run(timeStep);
	};

	start() {
		this.accumulatedTime = this.timeStep;
		this.time = window.performance.now();
		this.AFR = window.requestAnimationFrame(this.handleRun);
	}

	stop() {
		window.cancelAnimationFrame(this.AFR);
	}
}
