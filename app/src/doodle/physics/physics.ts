/// <source path="../doodle.d.ts" />

module doodle {

    export class Physics {

        // Constants

        static accelConst = 1;
        static dragCoeff = 0.01;
        static G = 0.1;


        // Element physics

        static bounce(
            el: IPhysical & { radius: number; },
            ctx: CanvasRenderingContext2D
        ): boolean {
            let hasBounced = false;

            if (el.position.x - el.radius < 0) {
                hasBounced = true;
                el.velocity.x = Math.abs(el.velocity.x);
            } else if (el.position.x + el.radius > ctx.canvas.width) {
                hasBounced = true;
                el.velocity.x = - Math.abs(el.velocity.x);
            }

            if (el.position.y - el.radius < 0) {
                hasBounced = true;
                el.velocity.y = Math.abs(el.velocity.y);
            } else if (el.position.y + el.radius > ctx.canvas.height) {
                hasBounced = true;
                el.velocity.y = - Math.abs(el.velocity.y);
            }

            return hasBounced;
        }

        static move(el: INewtonian) {
            el.velocity = el.velocity.plus(el.acceleration);
            el.position = el.position.plus(el.velocity);
        }

        static applyForces(el: INewtonian) {
            el.acceleration = el.force.times(1 / el.mass);
            el.force = new Vector();
        }

        static drag(el: INewtonian) {
            el.force = el.force.minus(el.velocity.times(this.dragCoeff * el.velocity.length()));
        }

        static gravity(elA: INewtonian, elB: INewtonian) {
            let GonL = elA.position.minus(elB.position);
            let vectorLength = Math.max(GonL.length(), 0.00000001);
            GonL = GonL.times(this.G * elA.mass * elB.mass / vectorLength);
            elA.force = elA.force.minus(GonL);
            if (elB.force) {
                elB.force = elB.force.plus(GonL);
            }
        }

        static Hooke(elA: INewtonian, elB: INewtonian, hookeConst: number = 1) {
            let kx = elA.position.minus(elB.position).times(hookeConst);
            elA.force = elA.force.minus(kx);
            if (elB.force) {
                elB.force = elB.force.minus(kx);
            }
        }
    }
}
