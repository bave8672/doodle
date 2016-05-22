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
                this.mouse = new doodle.Mouse(this.ctx);
                this.mouse.mass = 1; //  get rid of this
            }
        }
        View.prototype.update = function () {
            this.clear();
            for (var index in this.activeElements) {
                if (this.activeElements.hasOwnProperty(index)) {
                    var el = this.activeElements[index];
                    el.update();
                }
            }
        };
        View.prototype.start = function () {
            this.update();
            this.handle = window.requestAnimationFrame(this.start.bind(this));
            this.running = true;
            return this;
        };
        View.prototype.stop = function () {
            window.cancelAnimationFrame(this.handle);
            this.running = false;
            return this;
        };
        View.prototype.addActive = function (el) {
            this.registerViewElement(el);
            this.activeElements[el.id] = el;
            return this;
        };
        View.prototype.addPassive = function (el) {
            this.registerViewElement(el);
            this.passiveElements[el.id] = el;
            return this;
        };
        View.prototype.remove = function (index) {
            var el = this.activeElements[index];
            delete this.activeElements[index];
            return el;
        };
        View.prototype.clear = function () {
            this.ctx.fillStyle = '#000';
            this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            this.ctx.fillStyle = '#fff';
        };
        View.prototype.generateIndex = function () {
            return this.currentIndex++;
        };
        View.prototype.registerViewElement = function (el) {
            el.id = this.generateIndex();
            el.ctx = this.ctx;
            el.view = this;
        };
        View.prototype.resize = function () {
            this.ctx.canvas.width = window.innerWidth;
            this.ctx.canvas.height = window.innerHeight;
        };
        return View;
    }());
    doodle.View = View;
})(doodle || (doodle = {}));
