/// <reference path="../doodle.d.ts" />

'use strict';

var moment = moment || (() => { }); // wtf?

module doodle {

    export class Mouse {

        position: Vector;
        isPressed: boolean;
        lastDown: DoodleMouseEvent;
        lastUp: DoodleMouseEvent;

        constructor(ctx: CanvasRenderingContext2D, x?, y?) {
            this.position = new Vector(x, y);
            ctx.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
            ctx.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
            ctx.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
        }

        private onMouseMove(e: MouseEvent) {
            this.position.x = e.x;
            this.position.y = e.y;
        }

        private onMouseDown(e: MouseEvent) {
            this.isPressed = true;
            this.lastDown = new DoodleMouseEvent(e);
        }

        private onMouseUp(e: MouseEvent) {
            this.isPressed = false;
            this.lastUp = new DoodleMouseEvent(e);
        }
    }

    class DoodleMouseEvent {
        position: Vector;
        time: any;

        constructor(e: MouseEvent) {
            this.position = new Vector(e.x, e.y);
            this.time = moment();
        }
    }
}