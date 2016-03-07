/// <source path="../app.d.ts" />
var doodle;
(function (doodle) {
    var Physics = (function () {
        function Physics() {
        }
        // Element physics
        Physics.bounce = function (el, ctx) {
            var hasBounced = false;
            if (el.position.x - el.radius < 0) {
                hasBounced = true;
                el.velocity.x = Math.abs(el.velocity.x);
            }
            else if (el.position.x + el.radius > ctx.canvas.width) {
                hasBounced = true;
                el.velocity.x = -Math.abs(el.velocity.x);
            }
            if (el.position.y - el.radius < 0) {
                hasBounced = true;
                el.velocity.y = Math.abs(el.velocity.y);
            }
            else if (el.position.y + el.radius > ctx.canvas.height) {
                hasBounced = true;
                el.velocity.y = -Math.abs(el.velocity.y);
            }
            return hasBounced;
        };
        Physics.move = function (el) {
            el.velocity = el.velocity.plus(el.acceleration);
            el.position = el.position.plus(el.velocity);
        };
        Physics.applyForces = function (el) {
            el.acceleration = el.force.times(1 / el.mass);
            el.force = new doodle.Vector();
        };
        Physics.drag = function (el) {
            el.force = el.force.minus(el.velocity.times(this.dragCoeff * el.velocity.length()));
        };
        Physics.gravity = function (elA, elB) {
            var GonL = elA.position.minus(elB.position);
            var vectorLength = Math.max(GonL.length(), 0.00000001);
            GonL = GonL.times(this.G * elA.mass * elB.mass / vectorLength);
            elA.force = elA.force.minus(GonL);
            if (elB.force) {
                elB.force = elB.force.plus(GonL);
            }
        };
        Physics.Hooke = function (elA, elB, hookeConst) {
            if (hookeConst === void 0) { hookeConst = 1; }
            var kx = elA.position.minus(elB.position).times(hookeConst);
            elA.force = elA.force.minus(kx);
            if (elB.force) {
                elB.force = elB.force.minus(kx);
            }
        };
        // Constants
        Physics.accelConst = 1;
        Physics.dragCoeff = 0.01;
        Physics.G = 0.1;
        return Physics;
    }());
    doodle.Physics = Physics;
})(doodle || (doodle = {}));
