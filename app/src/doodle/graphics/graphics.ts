/// <source path="../doodle.d.ts" />

'use strict';

module doodle {

    export class Graphics {

        static circle(ctx: CanvasRenderingContext2D, radius: number, x: number, y: number, color?: string) {
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2, true);
            ctx.closePath();
            if (color) {
                ctx.fillStyle = color;
            }
            ctx.fill();
        }

        static point(ctx: CanvasRenderingContext2D, x: number, y: number, color?: string) {
            if (color) {
                ctx.fillStyle = color;
            }
            ctx.fillRect(x, y, 1, 1);
        }
    }
}