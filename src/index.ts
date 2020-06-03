import Engine from "./engine.js";
import Cell from "./cell/cell.js";
import s from "./settings.js";

// * Canvas setup
const canvas = document.querySelector("canvas")!;
const c = canvas.getContext("2d")!;
canvas.width = 1000;
canvas.height = 500;

// * Basic functions
const fill = (color: string) => {
	c.fillStyle = color;
};

const rect = (x: number, y: number, width: number, height: number, color = "#fff") => {
	fill(color);
	c.fillRect(x, y, width, height);
};

const stroke = (color: string) => {
	c.strokeStyle = color;
};

const strokeRect = (x: number, y: number, width: number, height: number, lineWidth: number, color = "#fff") => {
	stroke(color);
	c.lineWidth = lineWidth;
	c.strokeRect(x, y, width, height);
};

const circle = (x: number, y: number, r: number, color = "#fff") => {
	c.beginPath();
	c.arc(x, y, r, 0, Math.PI * 2);
	fill(color);
	c.closePath();
	c.fill();
};

// * Setting up the simulation
for (let i = 0; i < s.popSize; i++) {
	const mBehav = Cell.mBehavs.SocialDistance;
	Cell.cells.push(new Cell(1, mBehav, circle));
}
const update = () => {
	rect(0, 0, 500, 500, "#000");
	strokeRect(0, 0, 500, 500, 2);
	// Updating every cell
	Cell.cells.forEach((cell) => {
		cell.update();
	});
};

const engine = new Engine(update, 1000 / 30);
engine.start();

// ! This is just experimental, to be removed
window.addEventListener("keydown", () => {
	engine.stop();
	console.log("Engine stopped");
});
