import Cell from "../cell.js";
import Susceptible from "./susceptible.js";
import s from "../../settings.js";
export default class Infectious {
    constructor(parent) {
        this.color = "#f56754";
        this.p = parent;
    }
    update() {
        Cell.cells.forEach((cell) => {
            if (cell.state instanceof Susceptible) {
                const dist = Math.abs(this.p.x - cell.x) ** 2 + Math.abs(this.p.y - cell.y) ** 2;
                if (dist <= s.infectious.range ** 2) {
                    if (s.infectious.probab > Math.random()) {
                        cell.shouldBeInfectious = true;
                    }
                }
            }
        });
    }
}
