/// <reference path="../doodle.d.ts" />

'use strict';

module doodle {

    export class View {

        ctx: CanvasRenderingContext2D;
        handle: number;
        activeElements: { [index: number]: IViewElement & IUpdatable; };
        passiveElements: { [index: number]: IViewElement; };
        mouse: Mouse & any;
        running = false;

        private currentIndex = 0;

        constructor(canvasId: string, trackMouse?: boolean) {
            let canvas = <HTMLCanvasElement>document.getElementById(canvasId);
            this.ctx = canvas.getContext('2d');
            this.activeElements = {};

            this.resize();
            window.onresize = this.resize.bind(this);

            if (trackMouse) {
                this.mouse = new Mouse(this.ctx);
                this.mouse.mass = 1; //  get rid of this
            }
        }

        update() {
            this.clear();
            for (let index in this.activeElements) {
                if (this.activeElements.hasOwnProperty(index)) {
                    let el = this.activeElements[index];
                    el.update();
                }
            }
        }

        start() {
            this.update();
            this.handle = window.requestAnimationFrame(this.start.bind(this));
            this.running = true;
            return this;
        }

        stop() {
            window.cancelAnimationFrame(this.handle);
            this.running = false;
            return this;
        }

        addActive(el: IViewElement & IUpdatable) {
            this.registerViewElement(el);
            this.activeElements[el.id] = el;
            return this;
        }
        addPassive(el: IViewElement) {
            this.registerViewElement(el);
            this.passiveElements[el.id] = el;
            return this;
        }

        remove(index: number) {
            let el = this.activeElements[index];
            delete this.activeElements[index];
            return el;
        }

        clear() {
            this.ctx.fillStyle = '#000';
            this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            this.ctx.fillStyle = '#fff';
        }

        private generateIndex() {
            return this.currentIndex++;
        }

        private registerViewElement(el: IViewElement) {
            el.id = this.generateIndex();
            el.ctx = this.ctx;
            el.view = this;
        }

        private resize() {
            this.ctx.canvas.width = window.innerWidth;
            this.ctx.canvas.height = window.innerHeight;
        }
    }
}
