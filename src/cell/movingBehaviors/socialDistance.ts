import WanderAround from "./wanderAround.js";
import Cell from "../cell.js";

export default class SocialDistance extends WanderAround {
	color = "#00ff00";
	constructor(parent: Cell) {
		super(parent);
	}

	update() {
		super.update();
		const closest = this.p.getClosest();
		const cell = closest[0];
		const dist = closest[1];
		const x = ((cell.x - this.p.x) ** 2 * Math.sign(cell.x - this.p.x)) / dist;
		const y = ((cell.y - this.p.y) ** 2 * Math.sign(cell.y - this.p.y)) / dist;
		this.p.aX += -super.lerp(0, x, 0.3);
		this.p.aY += -super.lerp(0, y, 0.3);
	}
}
