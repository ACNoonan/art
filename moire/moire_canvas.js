function setup() {
  createCanvas(windowWidth, windowHeight);
  //noLoop();
}

function draw() {
  background(220);
  
  const size = 120;
  const x = windowWidth / 2;
  const y = windowHeight / 2;
  
  for (let rf = 0; rf < 31; rf++) {
    rect(x + rf * 2, y + rf * 2, size - rf * 4, (size * 1.3) - rf * 4);
  }
}