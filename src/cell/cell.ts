type circleF = (x: number, y: number, r: number, color: string | undefined) => void;

export default class Cell {
	public state: any;
	public mBehav: any;
	private color: string;
	private circle: circleF;
	private x: number;
	private y: number;
	private r = 4;
	private vX: number;
	private vY: number;
	private aX = 0;
	private aY = 0;

	constructor(state: any, mBehav: any, circle: circleF) {
		this.state = state;
		this.mBehav = mBehav;
		this.circle = circle;
		this.vX = 1;
		this.vY = 2;
		this.randomPos();
		this.color = "#ff0";
	}

	randomPos() {
		this.x = Math.random() * 486 + 7;
		this.y = Math.random() * 486 + 7;
	}

	get left() {
		return this.x - this.r;
	}

	get top() {
		return this.y - this.r;
	}

	get right() {
		return this.x + this.r;
	}

	get bottom() {
		return this.y + this.r;
	}

	set left(x:number) {
		this.x = x + this.r;
	}
	set top(y:number) {
		this.y = y + this.r;
	}

	set right(x:number) {
		this.x = x - this.r;
	}

	set bottom(y:number) {
		this.y = y - this.r;
	}

	updatePos() {
		this.vX += this.aX;
		this.vY += this.aY;
		this.aX = 0;
		this.aY = 0;
		this.x += this.vX;
		this.y += this.vY;

		// Checking the boundaries
		if (this.left < 0) {
			this.left = 0;
			this.vX = 0;
		} else if (this.right > 500) {
			this.right = 500;
			this.vX = 0;
		}

		if (this.top < 0) {
			this.top = 0;
			this.vY = 0;
		} else if (this.bottom > 500) {
			this.bottom = 500;
			this.vY = 0;
		}

	}

	draw() {
		this.circle(this.x, this.y, this.r, this.color);
	}

	update() {
		this.updatePos();
		this.draw();
	}
}
