let rotationAngle = 0;
let cornerRadiusAngle = 1;

function setup() {
    createCanvas(windowWidth, windowHeight);
    stroke(255);
    noFill();
    rectMode(CENTER);
}

function draw() {
    background(0);
    
    let centerX = windowWidth/2;
    let centerY = windowHeight/2;
    let numSquares = 20;
    let size = 100;
    let cornerRadius = map(sin(cornerRadiusAngle), -1, 1, 3, 9);
    
    push();
    translate(centerX, centerY);
    rotate(rotationAngle);
    
    for (let i = 0; i < numSquares; i++) {
      let angle = map(i, 0, numSquares, 0, TWO_PI);
      push();
      rotate(angle);
      rect(0, 0, size, size, cornerRadius);
      pop();
    }
    
    pop();
    
    rotationAngle += 0.0008;
    cornerRadiusAngle += 0.005;
}