![Demo](screenshots/demo.png)

# Doodle

A typescript wrapper for the 2D HTML canvas.

## Features:

- An interface to plug in your own custom canvas objects
- Implementation of common math and physics funcions.

## Quickstart

Install the dependencies and use gulp to fire up ther demo:

```
npm install
gulp
```

Head into src/doodle/viewElements/Ball.ts and try tweaking the move() method. Refresh the browser to see how your changes affect the demo.

Try defining your own canvas component - make a class with an update() method following the template of ball.ts - it can do anything. Then in app.ts register your element to the doodle object.

Have fun!

