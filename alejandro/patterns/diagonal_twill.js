// Parameters you can tweak
let cellSize = 20;
let colors = [];

// Pattern-specific parameters
let floatLength; // How many colored cells in a row
let skipLength;  // How many background cells in a row

function setup() {
  createCanvas(600, 600);
  // Define colors here to use p5's color object
  colors = [color(255), color(0, 100, 0)]; // White, Green
  
  // Set up interactivity
  noLoop(); // We only need to draw once
  generateNewPattern(); // Generate the first pattern
}

function draw() {
  background(220);
  let totalStep = floatLength + skipLength;

  // Nested loops to draw the grid
  for (let y = 0; y < height; y += cellSize) {
    for (let x = 0; x < width; x += cellSize) {
      // Get grid coordinates instead of pixel coordinates
      let col = x / cellSize;
      let row = y / cellSize;

      // CORE LOGIC: This is the rule!
      // We use the modulo operator to create a repeating cycle along the diagonals.
      let patternIndex = (col + row) % totalStep;

      // Decide the color based on the pattern rule
      if (patternIndex < floatLength) {
        fill(colors[1]); // Use the main color
      } else {
        fill(colors[0]); // Use the background color
      }
      
      noStroke();
      rect(x, y, cellSize, cellSize);
    }
  }
}

// This function randomizes the parameters and redraws the canvas
function generateNewPattern() {
  // Randomly pick a float and skip length
  floatLength = floor(random(2, 7)); // e.g., 2 to 6
  skipLength = floor(random(1, 4));  // e.g., 1 to 3

  // You can also randomize colors!
  // Example: A random red/white or blue/white
  if (random() > 0.5) {
    colors = [color(255), color(178, 34, 34)]; // Red
  } else {
    colors = [color(255), color(0, 0, 139)];   // Blue
  }
  
  redraw(); // Tell p5 to run draw() again
}

// When the mouse is pressed, generate a new version
function mousePressed() {
  generateNewPattern();
}