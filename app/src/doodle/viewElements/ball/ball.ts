/// <reference path="../../doodle.d.ts" />

module doodle {

    export class Ball implements IViewElement, IUpdatable {

        id: number;
        radius: number;
        position: Vector;
        velocity: Vector;
        acceleration: Vector;
        force: Vector;
        mass: number;
        color: string;
        ctx: CanvasRenderingContext2D;
        view: View;

        constructor(
            radius: number,
            x?: number,
            y?: number,
            color?: string) {
            this.radius = Math.round(radius) > 0 ? Math.round(radius) : 1;
            this.position = new Vector(x, y);
            this.velocity = new Vector();
            this.acceleration = new Vector();
            this.force = new Vector();
            this.mass = this.radius;
            this.color = color ? color : 'white';
        }

        update() {
            this.draw();
            this.move();
        }

        private draw() {
            Graphics.point(this.ctx, this.position.x, this.position.y);
        }

        private move() {
            Physics.bounce(this, this.ctx);
            //this.velocity = this.velocity.times(0.99);
            this.force = this.force.plus(new Vector(Math.random() - 0.5, Math.random() - 0.5);
            Physics.gravity(this, this.view.mouse);
            Physics.drag(this);
            Physics.applyForces(this);
            Physics.move(this);
        }
    }
}