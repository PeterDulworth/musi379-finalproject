function setup() {
  let myCanvas = createCanvas(windowWidth, 600);
  myCanvas.parent('p5canvas');
  background(28, 77, 93);
}

let t = 0;

function draw() {
  // colorMode(HSB)
  stroke(255, 255, 255, 5);
  // stroke('hsb(205, 100%,, 100%)')

  translate(width / 2, height / 2);

  noFill();
  strokeWeight(1);
  beginShape();
  for (let theta = 0; theta < TWO_PI; theta += 0.1) {
    // pick random radius
    let r = map(noise(t), 0, 1, 100, 300);
    // convert to cartesian
    let x = r * cos(theta);
    let y = r * sin(theta);
    vertex(x, y);

    t += 0.1;
  }
  endShape(CLOSE);

  // if (frameCount > 200) noLoop()
}
