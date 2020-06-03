import Engine from "./engine.js";
import Cell from "./cell/cell.js";
import Susceptible from "./cell/states/susceptible.js";
import Infectious from "./cell/states/infectious.js";
import Removed from "./cell/states/removed.js";
import s from "./settings.js";

// * Canvas setup
const canvas = document.querySelector("canvas")!;
const c = canvas.getContext("2d")!;
canvas.width = 1000;
canvas.height = 500;

// * Basic functions for drawing on the canvas
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

const text = (text: string, x: number, y: number, size: number, font = "Arial", color = "#fff") => {
	fill(color);
	c.font = `${size}px ${font}`;
	c.fillText(text, x, y);
};

// * Setting up the simulation
let socialDistancing = 0;
let infectious = 0;
for (let i = 0; i < s.popSize; i++) {
	// Setting movingBehavior
	let mBehav = Cell.mBehavs.WanderAround;
	const probM = (s.socialDistancing - socialDistancing) / (s.popSize - i);
	if (probM > Math.random()) {
		mBehav = Cell.mBehavs.SocialDistance;
		socialDistancing++;
	}

	// Setting state
	let state = Cell.states.Susceptible;
	const probS = (s.infectious.count - infectious) / (s.popSize - i);
	if (probS > Math.random()) {
		state = Cell.states.Infectious;
		infectious++;
	}

	Cell.cells.push(new Cell(state, mBehav, circle));
}

// Update the graph every fourth of a second
const updateGraphP = s.fps / 4;
let graphData: [number, number, number][] = [];
let r: number;
let currentTime = 0;
const popRatio = 450 / s.popSize;

// This is called every frame
const update = () => {
	rect(0, 0, 500, 500, "#000");
	rect(507, 457, 493, 42, "#000");
	strokeRect(507, 457, 493, 42, 2);
	// Updating every cell and calculating r
	let infectiousCount = 0;
	r = 0;
	Cell.cells.forEach((cell) => {
		cell.update(currentTime);
		if (cell.state instanceof Infectious) {
			infectiousCount++;
			r += cell.state.cellsInfected;
		}
	});
	r = Math.round((r / infectiousCount) * 100) / 100 || 0;
	// Draw border
	strokeRect(0, 0, 500, 500, 2);

	// * Updating graph

	// Update graph data
	if (currentTime % updateGraphP == 0) {
		let sus = 0;
		let inf = 0;
		let rem = 0;
		Cell.cells.forEach((cell) => {
			if (cell.state instanceof Susceptible) {
				sus++;
			} else if (cell.state instanceof Infectious) {
				inf++;
			} else {
				rem++;
			}
		});
		graphData.push([sus, inf, rem]);
	}

	// Stop the simulation if there are no infected cells
	if (graphData[graphData.length - 1][1] === 0) {
		const remPercent = Math.round((graphData[graphData.length - 1][2] / s.popSize) * 100);
		text(`Removed: ${remPercent}%`, 592, 487, 25);
		text("Simulation ended", 800, 487, 25);
		engine.stop();
	}

	// Draw graph
	rect(507, 0, 493, 450, Removed.color);
	graphData.forEach((data, i) => {
		const x = Math.floor((493 / graphData.length) * i) + 507;
		const w = Math.ceil(493 / graphData.length);
		rect(x, Math.floor(data[2] * popRatio), w, Math.ceil(data[0] * popRatio), Susceptible.color);
		rect(x, Math.floor(450 - data[1] * popRatio), w, Math.ceil(data[1] * popRatio), Infectious.color);
	});
	strokeRect(507, 0, 493, 450, 2);

	text(`R: ${r}`, 515, 487, 25);
	currentTime++;
};

// Start the engine
const engine = new Engine(update, 1000 / s.fps);
engine.start();
