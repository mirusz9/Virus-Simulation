import Engine from "./engine.js";
import Cell from "./cell/cell.js";
import s from "./settings.js";
// * Canvas setup
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 500;
// * Basic functions
const fill = (color) => {
    c.fillStyle = color;
};
const rect = (x, y, width, height, color = "#fff") => {
    fill(color);
    c.fillRect(x, y, width, height);
};
const stroke = (color) => {
    c.strokeStyle = color;
};
const strokeRect = (x, y, width, height, lineWidth, color = "#fff") => {
    stroke(color);
    c.lineWidth = lineWidth;
    c.strokeRect(x, y, width, height);
};
const circle = (x, y, r, color = "#fff") => {
    c.beginPath();
    c.arc(x, y, r, 0, Math.PI * 2);
    fill(color);
    c.closePath();
    c.fill();
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
let currentTime = 0;
const update = () => {
    rect(0, 0, 500, 500, "#000");
    strokeRect(0, 0, 500, 500, 2);
    // Updating every cell
    Cell.cells.forEach((cell) => {
        cell.update(currentTime);
    });
    currentTime++;
};
const engine = new Engine(update, 1000 / s.fps);
engine.start();
// ! This is just experimental, to be removed
window.addEventListener("keydown", () => {
    engine.stop();
    console.log("Engine stopped");
});
