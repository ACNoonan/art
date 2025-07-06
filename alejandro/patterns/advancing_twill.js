// Welcome to the 8-shaft advancing twill pattern generator!
// This recreates the pattern from the 08sK002.wif weaving draft

// --- Parameters to Tweak ---

// The size of each "thread" or square in our pattern
const cellSize = 12;

// The dimensions of our repeating "tile" from the weaving draft
// From 08sK002: 40 warp threads, 40 weft picks
const tileWidth = 40;
const tileHeight = 40;

// Let's define our colors for the twill
let warpColor, weftColor;

// --- Weaving Draft Data from 08sK002 ---

// Threading: Which shaft each warp thread is on (1-8)
const threading = [
  1,2,3,4,5,2,3,4,5,6,3,4,5,6,7,4,5,6,7,8,
  5,6,7,8,1,6,7,8,1,2,7,8,1,2,3,8,1,2,3,4
];

// Tieup: Which shafts each treadle activates
const tieup = {
  1: [1,2],
  2: [2,3], 
  3: [3,4],
  4: [4,5],
  5: [5,6],
  6: [6,7],
  7: [7,8],
  8: [1,8]
};

// Treadling: Which treadle to press for each pick (row)
const treadling = [
  1,2,3,4,5,2,3,4,5,6,3,4,5,6,7,4,5,6,7,8,
  5,6,7,8,1,6,7,8,1,2,7,8,1,2,3,8,1,2,3,4
];

// --- Generate the Pattern ---

function generateTwillPattern() {
  const pattern = [];
  
  for (let row = 0; row < tileHeight; row++) {
    const currentRow = [];
    
    // Get which treadle is pressed for this row
    const treadle = treadling[row];
    
    // Get which shafts are activated by this treadle
    const activatedShafts = tieup[treadle];
    
    // For each warp thread position
    for (let col = 0; col < tileWidth; col++) {
      // Get which shaft this warp thread is on
      const shaft = threading[col];
      
      // Check if this shaft is activated (thread goes up)
      // 1 = weft visible (warp thread is up), 0 = warp visible (warp thread is down)
      const isUp = activatedShafts.includes(shaft) ? 1 : 0;
      currentRow.push(isUp);
    }
    
    pattern.push(currentRow);
  }
  
  return pattern;
}

// Generate our pattern
const tilePattern = generateTwillPattern();

// --- p5.js Core Functions ---

function setup() {
  // Create a canvas that shows multiple repeats of the pattern
  createCanvas(tileWidth * cellSize * 2, tileHeight * cellSize * 2);
  
  // Define the colors for our twill
  warpColor = color(240, 240, 240); // Light gray for warp (when weft is under)
  weftColor = color(60, 90, 140);   // Deep blue for weft (when weft is over)
  
  noStroke(); // Clean geometric appearance
  
  // Draw once and stop (comment out noLoop() to add animation later)
  noLoop();
  redraw();
}

function draw() {
  background(200); // Neutral background

  // Calculate the total number of rows and columns we need to draw
  const totalCols = width / cellSize;
  const totalRows = height / cellSize;

  // Loop through every cell of our canvas grid
  for (let row = 0; row < totalRows; row++) {
    for (let col = 0; col < totalCols; col++) {

      // --- The Tiling Logic ---
      // Use modulo to wrap around and find the corresponding cell in our pattern
      const tileX = col % tileWidth;
      const tileY = row % tileHeight;

      // Get the color code (0 for warp visible, 1 for weft visible)
      const colorCode = tilePattern[tileY][tileX];

      // Set the fill color based on the code
      if (colorCode === 1) {
        fill(weftColor); // Weft thread is visible (goes over warp)
      } else {
        fill(warpColor); // Warp thread is visible (weft goes under)
      }
      
      // Draw the rectangle for this cell
      rect(col * cellSize, row * cellSize, cellSize, cellSize);
    }
  }
  
  // Add some information text
  fill(0);
  textSize(14);
  text("8-Shaft Advancing Twill (08sK002)", 10, height - 20);
  textSize(10);
  text("40x40 repeat • 2/6 twill • Straight advancing threading", 10, height - 5);
}

// Optional: Click to regenerate with different colors
function mousePressed() {
  // Randomize colors for fun
  warpColor = color(random(200,255), random(200,255), random(200,255));
  weftColor = color(random(0,100), random(0,100), random(100,200));
  redraw();
}

// Optional: Key press to show pattern info
function keyPressed() {
  if (key === 'i' || key === 'I') {
    console.log("Threading:", threading);
    console.log("Treadling:", treadling);
    console.log("Pattern dimensions:", tileWidth, "x", tileHeight);
    console.log("This is a 2/6 twill - 2 threads up, 6 threads down in each shed");
  }
} 