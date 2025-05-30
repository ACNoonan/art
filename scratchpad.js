let circleX, circleY;
let squareX, squareY;
let circles = [];
let squares = [];

function setup() {
  createCanvas(800, 600);
  frameRate(30);

  // Initialize shape arrays
  for (let i = 0; i < 20; i++) {
    if (i % 2 === 0) {
      squares.push(new Square());
    } else {
      circles.push(new Circle());
    }
  }

  // Initial positions
  for (let shape of squares) {
    shape.x = random(shape.width);
    shape.y = random(shape.height);
  }

  for (let shape of circles) {
    shape.x = random(shape.radius * 2);
    shape.y = random(shape.radius * 2);
  }
}

function draw() {
  background(220);

  // Draw and update shapes
  for (let shape of squares) {
    shape.display();
    checkCollision(shape, squares, circles);
    shape.update();
  }

  for (let shape of circles) {
    shape.display();
    checkCollision(shape, squares, circles);
    shape.update();
  }
}

class Square {
  constructor() {
    this.width = random(10, 50);
    this.height = random(10, 50);
    this.x = random(width);
    this.y = random(height);
  }

  display() {
    stroke(255, 0, 0);
    rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height);
  }

  update() {
    // Keep shapes from moving off the canvas
    if (this.x - this.width / 2 < 0) {
      this.x = width + this.width;
    } else if (this.x + this.width / 2 > width) {
      this.x = -this.width;
    }

    if (this.y - this.height / 2 < 0) {
      this.y = height + this.height;
    } else if (this.y + this.height / 2 > height) {
      this.y = -this.height;
    }
  }

  checkCollision(shape, otherShapes) {
    for (let otherShape of otherShapes) {
      if (shape !== otherShape && shape.intersect(otherShape)) {
        // Move the shapes apart
        let dx = shape.x - otherShape.x;
        let dy = shape.y - otherShape.y;

        if (dx * dx + dy * dy < (shape.width / 2 + otherShape.width / 2) * (shape.width / 2 + 
otherShape.width / 2)) {
          // Move the shapes apart
          if (dx > 0) {
            shape.x -= 1;
          } else {
            shape.x += 1;
          }

          if (dy > 0) {
            shape.y -= 1;
          } else {
            shape.y += 1;
          }
        }
      }
    }
  }
}

class Circle {
  constructor() {
    this.radius = random(10, 50);
    this.x = random(width);
    this.y = random(height);
  }

  display() {
    stroke(0, 255, 0);
    ellipseMode(CENTER);
    ellipse(this.x, this.y, this.radius * 2);
  }

  update() {
    // Keep shapes from moving off the canvas
    if (this.x - this.radius < 0) {
      this.x = width + this.radius;
    } else if (this.x + this.radius > width) {
      this.x = -this.radius;
    }

    if (this.y - this.radius < 0) {
      this.y = height + this.radius;
    } else if (this.y + this.radius > height) {
      this.y = -this.radius;
    }
  }

  checkCollision(shape, otherShapes) {
    for (let otherShape of otherShapes) {
      if (shape !== otherShape && shape.intersect(otherShape)) {
        // Move the shapes apart
        let dx = shape.x - otherShape.x;
        let dy = shape.y - otherShape.y;

        if (dx * dx + dy * dy < (shape.radius + otherShape.width / 2) * (shape.radius + otherShape.width / 
2)) {
          // Move the shapes apart
          if (dx > 0) {
            shape.x -= 1;
          } else {
            shape.x += 1;
          }

          if (dy > 0) {
            shape.y -= 1;
          } else {
            shape.y += 1;
          }
        }
      }
    }
  }

  intersect(otherShape) {
    let dx = this.x - otherShape.x;
    let dy = this.y - otherShape.y;

    if (dx * dx + dy * dy < (this.radius + otherShape.width / 2) * (this.radius + otherShape.width / 2)) {
      return true;
    } else {
      return false;
    }
  }
}