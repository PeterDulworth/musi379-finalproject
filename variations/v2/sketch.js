let fr = 30; // default 30
let history = [];
let fade = 0.3; // fade speed (0 - 1)
let zPerlin = 0; // this is what causes it to animate
var scrollCount = 30.0;

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
  translate(width / 2, height / 2);
  stroke(10, 255, 255);
  noFill();
  // noiseSeed(99); // start with the same shape everytime

  let noiseMax = map(scrollCount, 0, 100, 2, 20);
  let angleStepSize = 0.01; // num vertices = 2 * PI / angleStepSize
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
    let r = map(noise(xPerlin, yPerlin, zPerlin), 0, 1, 200, 300);

    // convert (theta, r) polar to (x, y) cartesian coords
    let x = r * xu;
    let y = r * yu;
    curveVertex(x, y);

    r = map(noise(xPerlin, yPerlin, zPerlin), 0, 1, 50, 200);

    // convert (theta, r) polar to (x, y) cartesian coords
    x = r * xu;
    y = r * yu;
    curveVertex(x, y);
  }
  endShape(CLOSE);

  zPerlin += 0.1; // speed moving through the animation
}

window.addEventListener('wheel', (e) => {
  if (e.wheelDelta < 0 && scrollCount < 100) scrollCount += 1;
  else if (e.wheelDelta > 0 && scrollCount > 0) scrollCount -= 1;
  document.querySelector('.number').innerHTML = scrollCount;
});
