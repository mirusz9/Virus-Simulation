import Cell from "../cell.js";
import s from "../../settings.js";

export default class WanderAround {
	p: Cell;
	color = "#ff0000";
	constructor(parent: Cell) {
		this.p = parent;
	}

	update() {
		const x = Math.random() * s.maxVel * 2 - s.maxVel;
		const y = Math.random() * s.maxVel * 2 - s.maxVel;
		this.p.aX += this.lerp(0, x, 0.1);
		this.p.aY += this.lerp(0, y, 0.1);
	}

	lerp(v0: number, v1: number, t: number) {
		return (1 - t) * v0 + t * v1;
	}
}
