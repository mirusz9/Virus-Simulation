import Cell from "../cell.js";
export default class Removed {
	color = "#444345";
	p: Cell;
	constructor(parent: Cell) {
		this.p = parent;
	}
}
