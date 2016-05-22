/// <reference path="../doodle.d.ts" />
'use strict';
var doodle;
(function (doodle) {
    var Vector = (function () {
        function Vector(x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            this.x = x;
            this.y = y;
        }
        Vector.from = function (vector) {
            return new Vector(vector.x, vector.y);
        };
        Vector.prototype.length = function () {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        };
        Vector.prototype.distance = function (v) {
            return Math.sqrt(this.x * v.x + this.y * v.y);
        };
        Vector.prototype.plus = function (v) {
            return new Vector(this.x + v.x, this.y + v.y);
        };
        Vector.prototype.minus = function (v) {
            return new Vector(this.x - v.x, this.y - v.y);
        };
        Vector.prototype.times = function (s) {
            return new Vector(this.x * s, this.y * s);
        };
        Vector.prototype.normalise = function () {
            var l = this.length();
            return new Vector(this.x / l, this.y / l);
        };
        Vector.prototype.average = function (vectors) {
            var s = new Vector();
            for (var i_1 = 0; i_1 < vectors.length; i_1++) {
                s = s.plus(vectors[i_1]);
            }
            return s.times(vectors.length);
        };
        Vector.prototype.rotate = function (theta) {
            return new Vector(this.x * Math.cos(theta) - this.y * Math.sin(theta), this.x * Math.sin(theta) + this.y * Math.cos(theta));
        };
        return Vector;
    }());
    doodle.Vector = Vector;
})(doodle || (doodle = {}));
