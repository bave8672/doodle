/// <reference path="../doodle.d.ts" />
'use strict';
var moment = moment || (function () { }); // wtf?
var doodle;
(function (doodle) {
    var Mouse = (function () {
        function Mouse(ctx, x, y) {
            this.position = new doodle.Vector(x, y);
            ctx.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
            ctx.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
            ctx.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
        }
        Mouse.prototype.onMouseMove = function (e) {
            this.position.x = e.x;
            this.position.y = e.y;
        };
        Mouse.prototype.onMouseDown = function (e) {
            this.isPressed = true;
            this.lastDown = new DoodleMouseEvent(e);
        };
        Mouse.prototype.onMouseUp = function (e) {
            this.isPressed = false;
            this.lastUp = new DoodleMouseEvent(e);
        };
        return Mouse;
    }());
    doodle.Mouse = Mouse;
    var DoodleMouseEvent = (function () {
        function DoodleMouseEvent(e) {
            this.position = new doodle.Vector(e.x, e.y);
            this.time = moment();
        }
        return DoodleMouseEvent;
    }());
})(doodle || (doodle = {}));
