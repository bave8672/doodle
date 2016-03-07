/// <reference path="../doodle.d.ts" />

'use strict';

module doodle {

    export class Vector implements I2DVector {

        x: number;
        y: number;

        constructor(x: number = 0, y: number = 0) {
            this.x = x;
            this.y = y;
        }

        static from(vector: I2DVector): Vector {
            return new Vector(vector.x, vector.y);
        }

        length(): number {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }

        distance(v: Vector): number {
            return Math.sqrt(this.x * v.x + this.y * v.y);
        }

        plus(v: I2DVector): Vector {
            return new Vector(this.x + v.x, this.y + v.y);
        }

        minus(v: I2DVector): Vector {
            return new Vector(this.x - v.x, this.y - v.y);
        }

        times(s: number): Vector {
            return new Vector(this.x * s, this.y * s);
        }

        normalise(): Vector {
            let l = this.length();
            return new Vector(this.x / l, this.y / l);
        }

        average(vectors: I2DVector[]): Vector {
            let s = new Vector();
            for (let i = 0; i < vectors.length; i++) {
                s = s.plus(vectors[i]);
            }
            return s.times(vectors.length);
        }

        rotate(theta: number): Vector {
            return new Vector(
                this.x * Math.cos(theta) - this.y * Math.sin(theta),
                this.x * Math.sin(theta) + this.y * Math.cos(theta));
        }
    }
}