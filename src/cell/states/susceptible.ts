import Cell from "../cell.js";
export default class Susceptible {
	color = "#7ebeb8";
	p: Cell;
	constructor(parent: Cell) {
		this.p = parent;
	}
}