// Welcome to your new pattern generator!
// I'm acting as your p5.js and art teacher to help you learn.

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
let white, green;


// --- The Pattern Recipe ---

// This is the heart of our pattern! It's the "repeating tile".
// It's an 18x30 grid based on the weaving draft.
// 0 = White thread (weft goes under the warp)
// 1 = Green thread (weft goes over the warp)
//
// I've expanded this to the correct 18x30 size.
// The next step is to fill this out to match the draft!
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
  
  noStroke(); // We'll let the colors define the shapes
  
  // We only need to draw the pattern once, so we can stop the loop.
  // You can comment this out if you want to add animation later.
  noLoop(); 
  
  // We explicitly call redraw once to make sure the canvas updates.
  redraw();
}

function draw() {
  background(220); // A neutral background

  // Calculate the total number of rows and columns we need to draw
  const totalCols = width / cellSize;
  const totalRows = height / cellSize;

  // Loop through every cell of our canvas grid
  for (let row = 0; row < totalRows; row++) {
    for (let col = 0; col < totalCols; col++) {

      // --- The Tiling Logic ---
      // Here's the magic. We use the modulo operator (%) to wrap around
      // and find the corresponding cell in our smaller `tilePattern`.
      const tileX = col % tileWidth;
      const tileY = row % tileHeight;

      // Get the color code (0 for white, 1 for green) from our recipe
      const colorCode = tilePattern[tileY][tileX];

      // Set the fill color based on the code
      if (colorCode === 1) {
        fill(green);
      } else {
        fill(white);
      }
      
      // Draw the rectangle for this cell
      rect(col * cellSize, row * cellSize, cellSize, cellSize);
    }
  }
}

// You can add interactivity later! For example, regenerate the pattern on click.
// function mousePressed() {
//   // In the future, we could randomize the tilePattern here!
//   redraw();
// } 