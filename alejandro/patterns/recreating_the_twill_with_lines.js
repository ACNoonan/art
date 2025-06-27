// Welcome to your new pattern generator!
// I'm acting as your p5.js and art teacher to help you learn.

// This version adds horizontal separator lines for a more "woven" look.

// --- Parameters to Tweak ---

// The size of each "thread" or square in our pattern
const cellSize = 15;

// The dimensions of our repeating "tile".
// These values come directly from the weaving draft!
// "Threading: 18" -> The pattern is 18 threads wide.
const tileWidth = 18;
// "Treadling: 30" -> The pattern is 30 rows high.
const tileHeight = 30; 

// Let's define our colors for clarity
let white, green, black;


// --- The Pattern Recipe ---

// This is the heart of our pattern! It's the "repeating tile".
// You've meticulously filled this out from the draft. Great work!
const tilePattern = [
    // Rows 1-10
   [1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
   [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1],
   [0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1],
   [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0],
   [0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0],
   [1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
   [1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1],
   [0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0],
   [0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0],
   [0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    // Rows 11-20
   [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
   [1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
   [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1],
   [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0],
   [0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0],
   [0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0],
   [0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0],
   [1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
   [1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1],
   [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1],
    // Rows 21-30
   [0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0],
   [0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0],
   [0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0],
   [1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1],
   [1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
   [1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1],
   [0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1],
   [0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0],
   [0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0],
   [1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0]
];


// --- p5.js Core Functions ---

function setup() {
  // Create a canvas that can perfectly fit our tiles
  createCanvas(tileWidth * cellSize * 3, tileHeight * cellSize * 3);
  
  // Define the colors we'll use
  white = color(255);
  green = color(4, 128, 6); // A nice, rich green
  black = color(0);
  
  // We only need to draw the pattern once, so we can stop the loop.
  noLoop(); 
  redraw();
}

function draw() {
  background(220); // A neutral background

  const totalCols = width / cellSize;
  const totalRows = height / cellSize;

  // A helper function to safely get the color code of any cell,
  // wrapping around the tile pattern for seamless tiling.
  const getColor = (c, r) => {
    const tileX = ((c % tileWidth) + tileWidth) % tileWidth;
    const tileY = ((r % tileHeight) + tileHeight) % tileHeight;
    return tilePattern[tileY][tileX];
  };

  // Loop through every cell to draw it and its borders
  for (let row = 0; row < totalRows; row++) {
    for (let col = 0; col < totalCols; col++) {
      const x = col * cellSize;
      const y = row * cellSize;
      const currentColor = getColor(col, row);

      // --- 1. Draw the fill color ---
      noStroke();
      if (currentColor === 1) {
        fill(green);
      } else {
        fill(white);
      }
      rect(x, y, cellSize, cellSize);

      // --- 2. Draw the borders based on our perfected rule ---
      stroke(black);
      strokeWeight(2);

      // The rule: Draw a border between two cells unless BOTH are green.

      // Check HORIZONTALLY (the cell below)
      const belowColor = getColor(col, row + 1);
      if (!(currentColor === 1 && belowColor === 1)) {
        line(x, y + cellSize, x + cellSize, y + cellSize);
      }

      // Check VERTICALLY (the cell to the right)
      const rightColor = getColor(col + 1, row);
      if (currentColor === 1 && rightColor !== 1) {
        line(x + cellSize, y, x + cellSize, y + cellSize);
      }
    }
  }
} 