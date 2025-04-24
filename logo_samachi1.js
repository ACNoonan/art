function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  stroke(255);
  noFill();
  rectMode(CENTER);
  
  let centerX = windowWidth/2;
  let centerY = windowHeight/2;
  let numSquares = 20;
  let size = 100;
  let cornerRadius = 10; 
  
  for (let i = 0; i < numSquares; i++) {
    let angle = map(i, 0, numSquares, 0, TWO_PI);
    push();
    translate(centerX, centerY);
    rotate(angle);
    rect(0, 0, size, size, cornerRadius);
    pop();
  }
}