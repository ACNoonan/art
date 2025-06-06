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
  constructor(maxNonOverlappingShapes = 0) {
    this.width = random(10, 50);
    this.height = random(10, 50);
    this.x = random(width);
    this.y = random(height);
    this.maxNonOverlappingShapes = maxNonOverlappingShapes;
  }

  checkCollision(otherShapes, maxNonOverlappingShapes) {
    let overlappingShapes = [];

    // Count the number of shapes that overlap with each other
    for (let otherShape of otherShapes) {
      if (this !== otherShape && this.intersect(otherShape)) {
        overlappingShapes.push(otherShape);
      }
    }

    // If there are more overlapping shapes than allowed, move this shape apart from them
    if (overlappingShapes.length > this.maxNonOverlappingShapes) {
      let dx = 0;
      let dy = 0;

      for (let otherShape of overlappingShapes) {
        let overlapDistanceX = (this.x + this.width / 2 - otherShape.x - otherShape.width / 2) / (this.width + 
otherShape.width);
        let overlapDistanceY = (this.y + this.height / 2 - otherShape.y - otherShape.height / 2) / (this.height + 
otherShape.height);

        if (overlapDistanceX > 0 && overlapDistanceX < 1) {
          dx += overlapDistanceX;
        }

        if (overlapDistanceY > 0 && overlapDistanceY < 1) {
          dy += overlapDistanceY;
        }
      }

      // Move the shape apart by a small amount in the direction of the overlap
      this.x -= dx * 5; // adjust the value to your liking
      this.y -= dy * 5;

      // If still overlapping, try again with a slightly different position
      if (overlappingShapes.length > this.maxNonOverlappingShapes) {
        this.checkCollision(otherShapes, maxNonOverlappingShapes);
      }
    }
  }

  intersect(otherShape) {
    let dx = this.x - otherShape.x;
    let dy = this.y - otherShape.y;

    return Math.sqrt(dx * dx + dy * dy) < (this.width / 2 + otherShape.width / 2);
  }
}

class Circle {
  constructor(maxNonOverlappingShapes = 0) {
    this.radius = random(10, 50);
    this.x = random(width);
    this.y = random(height);
    this.maxNonOverlappingShapes = maxNonOverlappingShapes;
  }

  checkCollision(otherShapes, maxNonOverlappingShapes) {
    let overlappingShapes = [];

    // Count the number of shapes that overlap with each other
    for (let otherShape of otherShapes) {
      if (this !== otherShape && this.collidesWith(otherShape)) {
        overlappingShapes.push(otherShape);
      }
    }

    // If there are more overlapping shapes than allowed, move this shape apart from them
    if (overlappingShapes.length > this.maxNonOverlappingShapes) {
      let dx = 0;
      let dy = 0;

      for (let otherShape of overlappingShapes) {
        let overlapDistanceX = (this.x - otherShape.x) / (this.radius + otherShape.width);
        let overlapDistanceY = (this.y - otherShape.y) / (this.radius + otherShape.height);

        if (overlapDistanceX > 0 && overlapDistanceX < 1) {
          dx += overlapDistanceX;
        }

        if (overlapDistanceY > 0 && overlapDistanceY < 1) {
          dy += overlapDistanceY;
        }
      }

      // Move the shape apart by a small amount in the direction of the overlap
      this.x -= dx * 5; // adjust the value to your liking
      this.y -= dy * 5;

      // If still overlapping, try again with a slightly different position
      if (overlappingShapes.length > this.maxNonOverlappingShapes) {
        this.checkCollision(otherShapes, maxNonOverlappingShapes);
      }
    }
  }

  collidesWith(otherShape) {
    let dx = this.x - otherShape.x;
    let dy = this.y - otherShape.y;

    return Math.sqrt(dx * dx + dy * dy) < (this.radius + otherShape.width / 2);
  }
}