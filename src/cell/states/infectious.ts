import Cell from "../cell.js";
export default class Infectious {
	color = "#f56754";
	p: Cell;
	constructor(parent: Cell) {
		this.p = parent;
	}
}
