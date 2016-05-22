/// <source path="../doodle.d.ts" />

interface I2DVector {
    x: number;
    y: number;
}

interface IPhysical {
    position: doodle.Vector;
    velocity?: doodle.Vector;
    acceleration?: doodle.Vector;
}

interface INewtonian extends IPhysical {
    force?: doodle.Vector;
    mass?: number;
}
