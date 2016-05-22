/// <reference path="../../doodle.d.ts" />
var doodle;
(function (doodle) {
    var Ball = (function () {
        function Ball(radius, x, y, color) {
            this.radius = Math.round(radius) > 0 ? Math.round(radius) : 1;
            this.position = new doodle.Vector(x, y);
            this.velocity = new doodle.Vector();
            this.acceleration = new doodle.Vector();
            this.force = new doodle.Vector();
            this.mass = this.radius;
            this.color = color ? color : 'white';
        }
        Ball.prototype.update = function () {
            this.draw();
            this.move();
        };
        Ball.prototype.draw = function () {
            doodle.Graphics.point(this.ctx, this.position.x, this.position.y);
        };
        Ball.prototype.move = function () {
            doodle.Physics.bounce(this, this.ctx);
            this.force = this.force.plus(new doodle.Vector(Math.random() - 0.5, Math.random() - 0.5));
            doodle.Physics.gravity(this, this.view.mouse);
            doodle.Physics.drag(this);
            doodle.Physics.applyForces(this);
            doodle.Physics.move(this);
        };
        return Ball;
    }());
    doodle.Ball = Ball;
})(doodle || (doodle = {}));
