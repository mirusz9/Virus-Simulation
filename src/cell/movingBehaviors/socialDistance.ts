import WanderAround from "./wanderAround.js";
import Cell from "../cell.js";

export default class SocialDistance extends WanderAround {
	color = "#00ff00";
	constructor(parent: Cell) {
		super(parent);
	}

	update() {
		super.update();

		// Get closest cell
		let closestDist = Infinity;
		let closestI = 0;
		Cell.cells.forEach((cell, index) => {
			if (cell !== this.p) {
				const dist = Math.abs(this.p.x - cell.x) ** 2 + Math.abs(this.p.y - cell.y) ** 2;
				if (dist < closestDist) {
					closestDist = dist;
					closestI = index;
				}
			}
		});

		// Try get away from closest cell
		const cell = Cell.cells[closestI];
		const x = ((cell.x - this.p.x) ** 2 * Math.sign(cell.x - this.p.x)) / closestDist;
		const y = ((cell.y - this.p.y) ** 2 * Math.sign(cell.y - this.p.y)) / closestDist;
		this.p.aX += -super.lerp(0, x, 0.3);
		this.p.aY += -super.lerp(0, y, 0.3);
	}
}
