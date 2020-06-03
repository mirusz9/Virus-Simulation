import s from "../../settings.js";
export default class WanderAround {
    constructor(parent) {
        this.color = "#ff0000";
        this.p = parent;
    }
    update() {
        // Random walk
        const x = Math.random() * s.maxVel * 2 - s.maxVel;
        const y = Math.random() * s.maxVel * 2 - s.maxVel;
        this.p.aX += this.lerp(0, x, 0.1);
        this.p.aY += this.lerp(0, y, 0.1);
    }
    lerp(v0, v1, t) {
        return (1 - t) * v0 + t * v1;
    }
}
