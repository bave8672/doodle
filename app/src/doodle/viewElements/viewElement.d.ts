/// <reference path="../doodle.d.ts" />

interface IUpdatable {
    update(): void;
}

interface IViewElement {
    id?: number;
    position: I2DVector;
    ctx?: CanvasRenderingContext2D;
    view?: doodle.View;
}
