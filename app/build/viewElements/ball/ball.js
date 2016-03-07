/// <reference path="../../app.d.ts" />
var doodle;
(function (doodle) {
    var Ball = (function () {
        function Ball(radius, x, y, color) {
            this.radius = Math.round(radius) > 0 ? Math.round(radius) : 1;
            this.position = new doodle.Vector(x, y);
            this.velocity = new doodle.Vector(Math.random(), Math.random()).times(2);
            this.acceleration = new doodle.Vector();
            this.force = new doodle.Vector();
            this.mass = this.radius;
            this.color = color ? color : 'white';
        }
        Ball.prototype.draw = function () {
            doodle.Graphics.point(this.ctx, this.position.x, this.position.y);
        };
        Ball.prototype.move = function () {
            doodle.Physics.bounce(this, this.ctx);
            this.velocity = this.velocity.rotate(0.01);
            doodle.Physics.gravity(this, this.view.mouse);
            doodle.Physics.applyForces(this);
            doodle.Physics.move(this);
        };
        Ball.prototype.update = function () {
            this.draw();
            this.move();
        };
        return Ball;
    }());
    doodle.Ball = Ball;
})(doodle || (doodle = {}));
