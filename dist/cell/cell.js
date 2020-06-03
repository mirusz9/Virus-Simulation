import WanderAround from "./movingBehaviors/wanderAround.js";
import s from "../settings.js";
var _mBehavs;
(function (_mBehavs) {
    _mBehavs[_mBehavs["WanderAround"] = 0] = "WanderAround";
})(_mBehavs || (_mBehavs = {}));
let Cell = /** @class */ (() => {
    class Cell {
        constructor(state, mBehav, circle) {
            this.r = 4;
            this.vX = 0;
            this.vY = 0;
            this.aX = 0;
            this.aY = 0;
            this.state = state;
            switch (mBehav) {
                case 0:
                    this.mBehav = new WanderAround(this);
                    break;
            }
            this.circle = circle;
            this.randomPos();
            this.color = "#ff0";
        }
        randomPos() {
            this.x = Math.random() * 486 + 7;
            this.y = Math.random() * 486 + 7;
        }
        get left() {
            return this.x - this.r;
        }
        get top() {
            return this.y - this.r;
        }
        get right() {
            return this.x + this.r;
        }
        get bottom() {
            return this.y + this.r;
        }
        set left(x) {
            this.x = x + this.r;
        }
        set top(y) {
            this.y = y + this.r;
        }
        set right(x) {
            this.x = x - this.r;
        }
        set bottom(y) {
            this.y = y - this.r;
        }
        updatePos() {
            this.mBehav.update();
            this.vX += this.aX;
            this.vY += this.aY;
            // Limiting velocity
            if (Math.abs(this.vX) > s.maxVel) {
                this.vX = s.maxVel * Math.sign(this.vX);
            }
            if (Math.abs(this.vY) > s.maxVel) {
                this.vY = s.maxVel * Math.sign(this.vY);
            }
            this.aX = 0;
            this.aY = 0;
            this.x += this.vX;
            this.y += this.vY;
            // Checking the boundaries
            if (this.left < 0) {
                this.left = 0;
                this.vX = 0;
            }
            else if (this.right > 500) {
                this.right = 500;
                this.vX = 0;
            }
            if (this.top < 0) {
                this.top = 0;
                this.vY = 0;
            }
            else if (this.bottom > 500) {
                this.bottom = 500;
                this.vY = 0;
            }
        }
        draw() {
            this.circle(this.x, this.y, this.r, this.color);
        }
        update() {
            this.updatePos();
            this.draw();
        }
    }
    Cell.mBehavs = _mBehavs;
    return Cell;
})();
export default Cell;
