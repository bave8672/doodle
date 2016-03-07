/// <source path="../doodle.d.ts" />
'use strict';
var doodle;
(function (doodle) {
    var Graphics = (function () {
        function Graphics() {
        }
        Graphics.circle = function (ctx, radius, x, y, color) {
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2, true);
            ctx.closePath();
            if (color) {
                ctx.fillStyle = color;
            }
            ctx.fill();
        };
        Graphics.point = function (ctx, x, y, color) {
            if (color) {
                ctx.fillStyle = color;
            }
            ctx.fillRect(x, y, 1, 1);
        };
        return Graphics;
    }());
    doodle.Graphics = Graphics;
})(doodle || (doodle = {}));
