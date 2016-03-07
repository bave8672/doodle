/// <reference path="../doodle.d.ts" />
'use strict';
var doodle;
(function (doodle) {
    var View = (function () {
        function View(canvasId, trackMouse) {
            this.running = false;
            this.currentIndex = 0;
            var canvas = document.getElementById(canvasId);
            this.ctx = canvas.getContext('2d');
            this.activeElements = {};
            this.resize();
            window.onresize = this.resize.bind(this);
            if (trackMouse) {
                this.mouse = {
                    position: new doodle.Vector(this.ctx.canvas.width / 2, this.ctx.canvas.height / 2),
                    mass: 1
                };
                canvas.onmousemove = this.onMouseMove.bind(this);
            }
        }
        View.prototype.update = function () {
            this.clear();
            for (var index in this.activeElements) {
                var el = this.activeElements[index];
                el.update();
            }
        };
        View.prototype.start = function () {
            this.update();
            this.handle = window.requestAnimationFrame(this.start.bind(this));
            this.running = true;
        };
        View.prototype.stop = function () {
            window.cancelAnimationFrame(this.handle);
            this.running = false;
        };
        View.prototype.add = function (el) {
            el.id = this.generateIndex();
            el.ctx = this.ctx;
            el.view = this;
            this.activeElements[el.id] = el;
            return el;
        };
        View.prototype.remove = function (index) {
            var el = this.activeElements[index];
            delete this.activeElements[index];
            return el;
        };
        View.prototype.clear = function () {
            this.ctx.fillStyle = '#000';
            this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            this.ctx.fillStyle = "#FFF";
        };
        View.prototype.generateIndex = function () {
            return this.currentIndex++;
        };
        View.prototype.resize = function () {
            this.ctx.canvas.width = window.innerWidth;
            this.ctx.canvas.height = window.innerHeight;
        };
        View.prototype.onMouseMove = function (e) {
            this.mouse.position.x = e.x;
            this.mouse.position.y = e.y;
        };
        return View;
    }());
    doodle.View = View;
})(doodle || (doodle = {}));
