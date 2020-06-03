import Cell from "../cell.js";
import Susceptible from "./susceptible.js";
import s from "../../settings.js";

export default class Infectious {
	static color = "#f56754";
	color = "#f56754";
	p: Cell;
	infectedTime: number;
	cellsInfected = 0;
	constructor(parent: Cell, infectedTime: number) {
		this.p = parent;
		this.infectedTime = infectedTime;
	}

	update(currentTime: number) {
		// Check if the cell should be removed
		if (currentTime - this.infectedTime > s.infectious.duration * s.fps) {
			this.p.shouldBeRemoved = true;
		} else {
			// Infect others in radius
			Cell.cells.forEach((cell) => {
				if (cell.state instanceof Susceptible) {
					const dist = Math.abs(this.p.x - cell.x) ** 2 + Math.abs(this.p.y - cell.y) ** 2;
					if (dist <= s.infectious.range ** 2) {
						if (s.infectious.probab > Math.random()) {
							cell.shouldBeInfectious = true;
							this.cellsInfected++;
						}
					}
				}
			});
		}
	}
}
