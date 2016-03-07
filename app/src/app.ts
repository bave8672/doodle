/// <reference path="doodle/doodle.d.ts" />

'use strict';

module app {

    let view = new doodle.View('canvas', true);
    for (var i = 0; i < 1000; i++) {
        view.addActive(new doodle.Ball(1, 200, 200));
    }

    view.start();
}
