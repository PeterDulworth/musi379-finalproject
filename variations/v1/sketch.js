let fr = 30; // default 30
let history = [];
let fade = 0.3; // fade speed (0 - 1)
let zPerlin = 0; // this is what causes it to animate
let scrollCount = 30.0;
let turn = 0;
let num_turns = 8;
let colors = ['#fe0000', '#fdfe02', '#0bff01', '#011efe', '#fe00f6'];
let num_colors = 5;
let color = 0;

function setup() {
  // create the canvas
  let myCanvas = createCanvas(windowWidth, 600);
  myCanvas.parent('p5canvas');
  frameRate(fr);
  background(28, 77, 93);
}

function draw() {
  // fade background by setting a small opacity each time
  background(28, 77, 93, map(fade, 0, 1, 0, 255));
  // background(0, 0, 0, map(fade, 0, 1, 0, 255));
  translate(width / 2, height / 2);
  stroke(10, 255, 255);
  noFill();
  // noiseSeed(99); // start with the same shape everytime

  let noiseMax = map(scrollCount, 0, 100, 2, 20);
  let angleStepSize = 0.01; // num vertices = 2 * PI / angleStepSize
  switch (turn) {
    case 0: {
      // stroke(colors[color]);
      draw_circle(zPerlin, angleStepSize, noiseMax, 250, 300);
      break;
    }
    case 1: {
      // stroke(colors[(color + 1) % num_colors]);
      draw_circle(zPerlin, angleStepSize, noiseMax, 200, 250);

      break;
    }
    case 2: {
      // stroke(colors[(color + 2) % num_colors]);
      draw_circle(zPerlin, angleStepSize, noiseMax, 175, 200);

      break;
    }
    case 3: {
      // stroke(colors[(color + 3) % num_colors]);
      draw_circle(zPerlin, angleStepSize, noiseMax, 150, 175);
      break;
    }
    case 4: {
      // stroke(colors[(color + 4) % num_colors]);
      draw_circle(zPerlin, angleStepSize, noiseMax, 125, 150);
      break;
    }
    case 5: {
      // stroke(colors[(color + 5) % num_colors]);
      draw_circle(zPerlin, angleStepSize, noiseMax, 100, 125);
      break;
    }
    case 6: {
      // stroke(colors[(color + 6) % num_colors]);
      draw_circle(zPerlin, angleStepSize, noiseMax, 75, 100);

      break;
    }
    case 7: {
      // stroke(colors[(color + 7) % num_colors]);
      draw_circle(zPerlin, angleStepSize, noiseMax, 50, 75);
      break;
    }
  }

  zPerlin += 0.1; // speed moving through the animation
  turn = (turn + 1) % num_turns;
  // color = (color + 1) % num_colors;
}

window.addEventListener('wheel', (e) => {
  if (e.wheelDelta < 0 && scrollCount < 100) scrollCount += 1;
  else if (e.wheelDelta > 0 && scrollCount > 0) scrollCount -= 1;
  document.querySelector('.number').innerHTML = scrollCount;
});

function draw_circle(zPerlin, angleStepSize, noiseMax, minR, maxR) {
  beginShape();
  for (let theta = 0; theta < TWO_PI; theta += angleStepSize) {
    // convert the angle to an (x, y) coord on the region [-1, 1] x [-1, 1]
    let xu = cos(theta);
    let yu = sin(theta);
    // the noise function doesn't take negative values so we map the region
    // [-1, 1] x [-1, 1] to the region [0, noiseMax] x [0, noiseMax]
    // note: the larger noiseMax is the more potential for variation in the r's there will be
    let xPerlin = map(xu, -1, 1, 0, noiseMax);
    let yPerlin = map(yu, -1, 1, 0, noiseMax);
    // pick the radius of the current point using the perlin x, y calculated above
    // note: we introduce the perlin-z as well in order to animate. because noise(x, y) is
    // constant for any given x and y, (and theta ranges from [0, 2 * PI] each time which determines x, y)
    // we have to add a z coordinate that moves us through time
    let r = map(noise(xPerlin, yPerlin, zPerlin), 0, 1, minR, maxR);

    // convert (theta, r) polar to (x, y) cartesian coords
    let x = r * xu;
    let y = r * yu;
    curveVertex(x, y);
  }
  endShape(CLOSE);
}
