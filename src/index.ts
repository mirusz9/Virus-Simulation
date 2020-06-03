import Engine from "./engine.js";

const canvas = document.querySelector("canvas")!;
const c = canvas.getContext("2d")!;
canvas.width = 1000;
canvas.height = 500;

const color = (color: string) => {
	c.fillStyle = color;
};

c.fillRect(0, 0, canvas.width, canvas.height);

const update = () => {

};

const engine = new Engine(update, 1000 / 60);
engine.start();

window.addEventListener("keydown", () => {
	engine.stop();
});
